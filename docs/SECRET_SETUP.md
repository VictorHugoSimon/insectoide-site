# Secrets necessários para o deploy Cloudflare

Configurar no repositório em **Settings → Secrets and variables → Actions**:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

O workflow não exibe os valores e não grava credenciais no código.

Quando ambos existirem, qualquer push relevante para `main` pode executar automaticamente o bootstrap da infraestrutura da Insectoide.
