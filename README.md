# 🚀 DigitalLaunch - SaaS de Produtos Digitais

Plataforma completa para transformar projetos digitais em landing pages profissionais com IA.

## ✨ Funcionalidades

- 📦 **Upload de ZIP**: Faça upload de qualquer projeto digital
- 🤖 **Análise com IA**: Claude analisa o conteúdo automaticamente
- 🎨 **Landing Pages**: Geração automática de páginas otimizadas
- 💰 **Checkout Integrado**: Pagamentos via Stripe
- 📊 **Analytics**: Acompanhe views e conversões
- 🎯 **SEO Otimizado**: Meta tags e estrutura profissional

## 🛠️ Stack Tecnológica

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **IA**: Claude API (Anthropic)
- **Pagamentos**: Stripe
- **Deploy**: Vercel

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta Anthropic (para API do Claude)
- Conta Stripe (modo teste)

## 🚀 Instalação Local

### 1. Clone e instale dependências

```bash
# Clone o repositório
cd digital-products-saas

# Instale dependências
npm install
```

### 2. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas chaves:

```env
# Database (SQLite para dev)
DATABASE_URL="file:./dev.db"

# Anthropic API (opcional para MVP - sem IA)
# Obtenha em: https://console.anthropic.com/
ANTHROPIC_API_KEY="sk-ant-..."

# Stripe (use test keys)
# Obtenha em: https://dashboard.stripe.com/test/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# URL da aplicação
NEXT_PUBLIC_URL="http://localhost:3000"
```

### 3. Configure o banco de dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar banco de dados e tabelas
npx prisma db push

# (Opcional) Abrir Prisma Studio para visualizar dados
npx prisma studio
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🎯 Como Usar

### 1. Criar um Projeto

1. Acesse http://localhost:3000
2. Clique em "Criar Projeto"
3. Faça upload de um arquivo ZIP
4. Responda o questionário
5. Aguarde o processamento (10-30 segundos)
6. Acesse sua landing page!

### 2. Estrutura do ZIP

O sistema aceita qualquer estrutura, mas funciona melhor com:

```
meu-projeto.zip
├── README.md          # Descrição do projeto
├── docs/             # Documentação
├── src/              # Código fonte
├── assets/           # Imagens, PDFs
└── exemplos/         # Arquivos de exemplo
```

### 3. Testar Checkout (Modo Teste)

Use os cartões de teste do Stripe:
- **Sucesso**: 4242 4242 4242 4242
- **Falha**: 4000 0000 0000 0002
- Data: Qualquer data futura
- CVV: Qualquer 3 dígitos

## 📁 Estrutura do Projeto

```
digital-products-saas/
├── app/                    # App Router do Next.js
│   ├── api/               # API Routes
│   │   └── projects/      # Endpoints de projetos
│   ├── create/            # Página de criação
│   ├── p/[slug]/          # Landing pages dinâmicas
│   └── project/[id]/      # Página de processamento
├── components/            # Componentes React
│   └── ui/               # Componentes UI (shadcn)
├── lib/                   # Utilitários
│   ├── prisma.ts         # Cliente Prisma
│   ├── slug.ts           # Gerador de slugs
│   └── utils.ts          # Funções auxiliares
├── prisma/               # Schema do banco
│   └── schema.prisma
├── uploads/              # Arquivos enviados (gitignored)
└── public/               # Assets estáticos
```

## 🚀 Deploy na Vercel

### 1. Preparar para produção

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login
```

### 2. Configurar banco de dados

Para produção, use PostgreSQL (recomendado: Neon, Supabase ou Vercel Postgres):

```bash
# Atualizar DATABASE_URL no .env
DATABASE_URL="postgresql://user:password@host/database"

# Migrar banco
npx prisma db push
```

### 3. Deploy

```bash
# Deploy
vercel

# Ou conecte o repositório no dashboard da Vercel
# https://vercel.com/new
```

### 4. Configurar variáveis de ambiente na Vercel

No dashboard da Vercel, adicione:
- `DATABASE_URL`
- `ANTHROPIC_API_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_URL` (sua URL da Vercel)

## 🔧 Desenvolvimento

### Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Lint
npm run lint

# Prisma Studio
npx prisma studio

# Reset do banco
npx prisma db push --force-reset
```

### Estrutura de Dados

O banco SQLite cria automaticamente em `prisma/dev.db`. Principais tabelas:

- **Project**: Projetos criados
- **Purchase**: Compras realizadas

## 🎨 Customização

### Adicionar Templates

Edite `app/p/[slug]/page.tsx` para criar novos layouts.

### Modificar Copy da IA

Edite a função `processProject` em `app/api/projects/create/route.ts`.

### Adicionar Campos

1. Edite `prisma/schema.prisma`
2. Execute `npx prisma db push`
3. Atualize os formulários

## 🐛 Troubleshooting

### Erro: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Erro: "Database locked"
```bash
# Feche o Prisma Studio e tente novamente
```

### Uploads não funcionam
```bash
# Certifique-se que o diretório existe
mkdir uploads
```

## 📚 Próximos Passos

Para transformar em produto completo:

1. ✅ **Autenticação**: Adicionar NextAuth.js
2. ✅ **Dashboard**: Painel para gerenciar projetos
3. ✅ **Análise IA Real**: Integrar Claude API
4. ✅ **Múltiplos Templates**: 6+ layouts diferentes
5. ✅ **Sistema de Pagamentos**: Stripe completo
6. ✅ **Analytics**: Tracking de conversões
7. ✅ **Email Marketing**: Mailgun/SendGrid
8. ✅ **CDN**: Cloudflare R2 para assets

## 📄 Licença

MIT - Livre para uso pessoal e comercial

## 🤝 Contribuindo

PRs são bem-vindos! Para mudanças maiores, abra uma issue primeiro.

## 📞 Suporte

- Email: suporte@digitallaunch.com
- Docs: https://docs.digitallaunch.com (em breve)

---

Feito com ❤️ para criadores digitais
