# Auto deploy Cloudflare

O workflow `Bootstrap Cloudflare` executa automaticamente em push para `main` e também pode ser executado manualmente.

## Comportamento
- Se `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` existirem como repository secrets, o workflow cria/reutiliza somente `insectoide-site` e `insectoide-db`, aplica migrations, publica Pages + Functions e executa smoke test.
- Se algum secret estiver ausente, o workflow termina sem publicar e informa quais nomes de secrets precisam ser configurados. Nenhum valor secreto é exibido.

## Secrets esperados
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Regra de isolamento
O workflow usa nomes fixos exclusivos da Insectoide e não procura nem reaproveita recursos de outros projetos.
