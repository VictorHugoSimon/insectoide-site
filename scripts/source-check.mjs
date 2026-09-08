import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'index.html',
  'privacidade.html',
  'favicon.svg',
  'social-card.svg',
  'robots.txt',
  'sitemap.xml',
  '_headers',
  '_redirects',
  'functions/_middleware.js',
  'functions/api/health.js',
  'functions/api/leads.js',
  'migrations/0001_init.sql',
  'docs/SMOKE_TEST.md'
];

const failures = [];
for (const file of requiredFiles) {
  if (!existsSync(file)) failures.push(`Arquivo obrigatório ausente: ${file}`);
}

if (failures.length === 0) {
  const index = readFileSync('index.html', 'utf8');
  const middleware = readFileSync('functions/_middleware.js', 'utf8');
  const leads = readFileSync('functions/api/leads.js', 'utf8');
  const health = readFileSync('functions/api/health.js', 'utf8');
  const migration = readFileSync('migrations/0001_init.sql', 'utf8');
  const headers = readFileSync('_headers', 'utf8');

  const checks = [
    [index.includes('INSECT'), 'A marca INSECTOIDE não foi encontrada no index.html'],
    [index.includes('Solicitar inspeção'), 'CTA principal não encontrado'],
    [index.includes('form class="form"'), 'Formulário comercial não encontrado'],
    [middleware.includes("fetch('/api/leads'"), 'Middleware não está conectado ao POST /api/leads'],
    [middleware.includes("name','company'"), 'Mapeamento de campos do formulário incompleto'],
    [leads.includes('context.env.DB'), 'API de leads não referencia o binding D1 DB'],
    [leads.includes('INSERT INTO leads'), 'API de leads não possui persistência na tabela leads'],
    [health.includes('database_configured'), 'Health check não informa estado do banco'],
    [migration.includes('CREATE TABLE IF NOT EXISTS leads'), 'Migration inicial não cria a tabela leads'],
    [headers.includes('X-Content-Type-Options'), 'Headers de segurança incompletos'],
    [!index.includes('font-awesome') && !index.includes('bootstrap-icons'), 'Biblioteca de ícones detectada no frontend']
  ];

  for (const [ok, message] of checks) if (!ok) failures.push(message);

  const sensitivePatterns = [
    /sk-[A-Za-z0-9_-]{20,}/,
    /ghp_[A-Za-z0-9]{20,}/,
    /CLOUDFLARE_API_TOKEN\s*=\s*['"][^'"]+['"]/i,
    /password\s*=\s*['"][^'"]{8,}['"]/i
  ];
  const sourceBundle = [index, middleware, leads, health, migration].join('\n');
  if (sensitivePatterns.some((pattern) => pattern.test(sourceBundle))) {
    failures.push('Possível credencial ou segredo hardcoded detectado.');
  }
}

if (failures.length) {
  console.error('\nSOURCE CHECK FALHOU\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Source check aprovado: estrutura, formulário, API, D1 e segurança básica validados.');
