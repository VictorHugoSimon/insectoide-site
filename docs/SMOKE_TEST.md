# Smoke test — Insectoide

Executar após cada deploy em preview e produção.

## Frontend
- [ ] `/` responde 200.
- [ ] Header, hero, soluções, segmentos, planos e contato renderizam sem quebra.
- [ ] Menu mobile abre e fecha.
- [ ] Layout é utilizável em 360 px, 768 px e desktop.
- [ ] `favicon.svg`, `social-card.svg`, `robots.txt` e `sitemap.xml` respondem 200.

## API
- [ ] `GET /api/health` responde 200 e JSON `ok: true`.
- [ ] `GET /api/leads` responde 200 e identifica o serviço.
- [ ] `POST /api/leads` sem campos obrigatórios retorna 400.
- [ ] `POST /api/leads` válido retorna 201 após o binding D1 `DB` estar ativo.
- [ ] Lead aparece na tabela `leads`.

## Segurança e operação
- [ ] `_headers` aplicado.
- [ ] Nenhum secret está exposto no repositório.
- [ ] D1 usado é exclusivo da Insectoide.
- [ ] Nenhum recurso de outros projetos foi reutilizado.

## Critério de liberação
Produção só é considerada validada quando frontend, API e persistência D1 passarem juntos.
