# INSECTOIDE — Site institucional

Baseline oficial do site da Insectoide, preparada para GitHub + Cloudflare Pages.

## Stack
- HTML/CSS/JS sem framework e sem dependências externas
- Cloudflare Pages para hospedagem
- Pages Functions para API
- Cloudflare D1 para leads

## Status
- [x] Site responsivo
- [x] Identidade tipográfica e geométrica
- [x] Sem biblioteca de ícones e sem ilustrações de insetos
- [x] SEO técnico inicial
- [x] Open Graph e favicon
- [x] robots.txt e sitemap.xml
- [x] cabeçalhos de segurança
- [x] Política de privacidade preliminar
- [x] API `POST /api/leads` criada
- [x] Schema D1 criado
- [ ] Projeto Cloudflare Pages criado
- [ ] Banco D1 criado e vinculado como `DB`
- [ ] Formulário conectado ao endpoint
- [ ] Domínio oficial validado

## Deploy Cloudflare Pages
Configuração sugerida segundo a documentação atual do Cloudflare Pages para HTML estático:
- Production branch: `main`
- Framework preset: None
- Build command: `exit 0`
- Build output directory: `.`

O repositório precisa permanecer com `index.html` na raiz.

## D1
A Pages Function usa o binding `DB`.

Após criar o banco D1, execute o conteúdo de `schema.sql` e vincule o banco ao projeto Pages com o nome de variável `DB`.

## Pendências de negócio antes do lançamento público
1. Validar nome e marca INSECTOIDE.
2. Confirmar domínio oficial. `insectoide.com.br` ainda é referência técnica no código.
3. Definir WhatsApp, e-mail e horário oficial.
4. Inserir CNPJ / razão social na política e rodapé quando disponíveis.
5. Revisar política de privacidade e consentimento do formulário.
6. Configurar analytics apenas após definir estratégia de medição.
