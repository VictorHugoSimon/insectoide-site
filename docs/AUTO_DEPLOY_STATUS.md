# Auto deploy status

Última evolução:
- bootstrap Cloudflare passa a executar automaticamente em push para `main`;
- se os secrets ainda não existirem, o workflow não falha nem altera recursos externos;
- quando os dois secrets estiverem disponíveis, o mesmo fluxo cria/valida Pages e D1, aplica migrations, publica e executa smoke test.

Isso reduz a necessidade de abrir o painel Actions apenas para disparar manualmente o primeiro deploy.
