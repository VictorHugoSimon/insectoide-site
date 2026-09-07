function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}})}

export async function onRequestPost(context){
  try{
    const request=context.request;
    const type=request.headers.get("content-type")||"";
    let payload={};
    if(type.includes("application/json")) payload=await request.json();
    else if(type.includes("form")) payload=Object.fromEntries((await request.formData()).entries());
    else return json({ok:false,error:"unsupported_content_type"},415);

    const clean=(v,max=500)=>String(v??"").trim().slice(0,max);
    const name=clean(payload.name,120);
    const company=clean(payload.company,160);
    const email=clean(payload.email,180).toLowerCase();
    const phone=clean(payload.phone,40);
    const city=clean(payload.city,120);
    const segment=clean(payload.segment,120);
    const message=clean(payload.message,2000);
    const website=clean(payload.website,200);

    if(website) return json({ok:true});
    if(!name||!company||!phone||!city||!segment) return json({ok:false,error:"missing_required_fields"},400);
    if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ok:false,error:"invalid_email"},400);
    if(!context.env.DB) return json({ok:false,error:"database_not_configured"},503);

    const id=crypto.randomUUID();
    const now=new Date().toISOString();
    const ip=request.headers.get("CF-Connecting-IP")||null;
    const ua=(request.headers.get("User-Agent")||"").slice(0,300);

    await context.env.DB.prepare(`INSERT INTO leads (id,name,company,email,phone,city,segment,message,status,source,ip,user_agent,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(id,name,company,email||null,phone,city,segment,message||null,"new","website",ip,ua,now).run();

    return json({ok:true,id},201);
  }catch(err){
    console.error("lead_error",err);
    return json({ok:false,error:"internal_error"},500);
  }
}

export function onRequestGet(){return json({ok:true,service:"insectoide-leads",method:"POST"});}
