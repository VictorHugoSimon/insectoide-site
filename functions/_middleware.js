const leadScript = `<script>
(function(){
  const form=document.getElementById('lead-form');
  const submit=document.getElementById('lead-submit');
  const status=document.getElementById('lead-status');
  if(!form||!submit||!status) return;

  function show(message,ok){
    status.textContent=message;
    status.style.display='block';
    status.style.color=ok?'#0f9362':'#b42318';
  }

  form.addEventListener('submit',async function(event){
    event.preventDefault();
    status.style.display='none';
    if(!form.checkValidity()){form.reportValidity();return;}

    const payload=Object.fromEntries(new FormData(form).entries());
    submit.disabled=true;
    submit.textContent='Enviando...';

    try{
      const response=await fetch('/api/leads',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
      const result=await response.json().catch(()=>({}));
      if(!response.ok||!result.ok){
        if(result.error==='database_not_configured') throw new Error('O canal de solicitações está em configuração. Tente novamente em breve.');
        throw new Error('Não foi possível enviar agora. Tente novamente em alguns instantes.');
      }
      form.reset();
      show('Solicitação enviada. Nossa equipe entrará em contato.',true);
    }catch(error){
      show(error.message||'Não foi possível enviar a solicitação.',false);
    }finally{
      submit.disabled=false;
      submit.textContent='Solicitar inspeção';
    }
  });
})();
</script>`;

export async function onRequest(context){
  const response=await context.next();
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html')) return response;

  let selectIndex=0;
  return new HTMLRewriter()
    .on('form.form',{element(el){
      el.setAttribute('id','lead-form');
      el.setAttribute('novalidate','');
      el.removeAttribute('onsubmit');
      el.append('<div style="position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden" aria-hidden="true"><label for="website">Website</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div>',{html:true});
    }})
    .on('input[placeholder="Seu nome"]',{element(el){el.setAttribute('name','name');el.setAttribute('autocomplete','name')}})
    .on('input[placeholder="Nome da empresa"]',{element(el){el.setAttribute('name','company');el.setAttribute('autocomplete','organization')}})
    .on('input[type="email"]',{element(el){el.setAttribute('name','email');el.setAttribute('autocomplete','email')}})
    .on('input[placeholder="(18) 00000-0000"]',{element(el){el.setAttribute('name','phone');el.setAttribute('autocomplete','tel')}})
    .on('form.form select',{element(el){selectIndex+=1;el.setAttribute('name',selectIndex===1?'city':'segment')}})
    .on('form.form textarea',{element(el){el.setAttribute('name','message')}})
    .on('form.form button[type="submit"]',{element(el){el.setAttribute('id','lead-submit')}})
    .on('#ok',{element(el){el.setAttribute('id','lead-status');el.setAttribute('role','status');el.setAttribute('aria-live','polite');el.setInnerContent('')}})
    .on('body',{element(el){el.append(leadScript,{html:true})}})
    .transform(response);
}
