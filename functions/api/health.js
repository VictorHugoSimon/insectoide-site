function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}})}

export function onRequestGet(context){
  return json({
    ok:true,
    service:"insectoide-site",
    api:"pages-functions",
    database_configured:Boolean(context.env.DB),
    timestamp:new Date().toISOString()
  });
}
