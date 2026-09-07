# INSECTOIDE — Site institucional

Baseline pronta para GitHub + Cloudflare Pages.

## Status
- Site estático responsivo
- Sem frameworks e sem dependências externas
- Sem biblioteca de ícones
- Identidade tipográfica e geométrica
- SEO técnico inicial
- Open Graph
- Schema.org local
- robots.txt e sitemap.xml
- cabeçalhos de segurança para Cloudflare Pages
- política de privacidade preliminar

## Pendências antes de produção
1. Confirmar nome INSECTOIDE e disponibilidade jurídica/marca.
2. Confirmar domínio oficial. `insectoide.com.br` é apenas referência no código até validação.
3. Informar WhatsApp, e-mail e horário oficial.
4. Definir CNPJ / razão social para política de privacidade e rodapé.
5. Conectar formulário a API/CRM.
6. Configurar analytics/cookies apenas após definir a estratégia de medição.
7. Criar ambiente no Cloudflare Pages.

## Deploy Cloudflare Pages
Projeto estático. Configuração sugerida:
- Framework preset: None
- Build command: vazio
- Build output directory: `/`
- Production branch: `main`

## Estrutura
- index.html
- privacidade.html
- favicon.svg
- social-card.svg
- robots.txt
- sitemap.xml
- _headers
- _redirects
