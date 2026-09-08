# Automação Cloudflare — Insectoide

## Objetivo
Reduzir a implantação manual. O workflow `Bootstrap Cloudflare` cria ou reutiliza apenas recursos com os nomes exclusivos da Insectoide, aplica a migration D1, publica Pages + Functions e executa smoke test.

## Recursos esperados
- Pages: `insectoide-site`
- D1: `insectoide-db`
- D1 binding: `DB`
- Production branch: `main`

## Secrets necessários no GitHub
Criar em **Settings → Secrets and variables → Actions**:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Nunca colocar os valores no código, issue, README ou chat público.

## Permissões mínimas sugeridas para o token
No escopo da conta correta:

- Cloudflare Pages: Edit
- D1: Edit

O token deve ser limitado à conta que hospedará a Insectoide.

## Como executar
1. Garantir os dois secrets acima.
2. GitHub → Actions.
3. Workflow **Bootstrap Cloudflare**.
4. Run workflow → `main`.
5. Aguardar conclusão.

## O que o workflow faz
1. Valida os secrets.
2. Instala Wrangler 4.x.
3. Verifica se `insectoide-site` já existe antes de criar.
4. Verifica se `insectoide-db` já existe antes de criar.
5. Obtém o ID do D1 sem gravá-lo permanentemente no repositório.
6. Gera `wrangler.toml` apenas durante a execução.
7. Aplica `migrations/0001_init.sql` no D1 remoto.
8. Publica o site e a pasta `functions` pelo Wrangler.
9. Valida `/`, `/api/health` e `/api/leads`.
10. Confirma que `database_configured` está ativo.

## Segurança e isolamento
- O workflow não cria nem altera recursos de outros projetos por nome.
- Não há secrets hardcoded.
- O arquivo `wrangler.toml` com o UUID do banco é criado somente no runner temporário.
- Produção é considerada válida apenas se o health check reconhecer o D1.

## Observação
Se `insectoide-site.pages.dev` não puder ser usado por conflito de nome, o workflow falhará sem escolher outro projeto automaticamente. Nesse caso, o nome deve ser decidido explicitamente antes de uma nova execução.
