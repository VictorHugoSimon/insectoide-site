# Deploy — Cloudflare Pages

## Projeto
Repositório: `VictorHugoSimon/insectoide-site`

## Configuração do Pages
- Importar repositório GitHub existente
- Production branch: `main`
- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `.`

O `index.html` deve permanecer na raiz.

## D1
Criar um banco D1 exclusivo da Insectoide.

Aplicar o conteúdo de `schema.sql`.

No projeto Pages, adicionar um D1 binding com:

`Variable name: DB`

Depois do binding, fazer um novo deploy para a Function receber `context.env.DB`.

## API
Rota preparada:

`POST /api/leads`

Campos esperados:
- name
- company
- email
- phone
- city
- segment
- message
- website (honeypot opcional)

## Validação pós-deploy
1. Home responde HTTP 200.
2. CSS aparece corretamente em desktop e mobile.
3. `/api/leads` responde via GET com identificação do serviço.
4. POST inválido retorna 400.
5. POST válido grava no D1 após o binding.
6. `robots.txt`, `sitemap.xml` e `favicon.svg` respondem 200.
7. Headers de segurança estão presentes.

## Regra de isolamento
Não reutilizar D1, Pages, Workers, domínios ou secrets de outros projetos.
