# 🚀 Guia de Deploy - Vercel

## Deploy em 5 Minutos

### Opção 1: Via Dashboard (Recomendado)

1. **Acesse Vercel**
   - Vá para https://vercel.com
   - Faça login com GitHub

2. **Importe o Projeto**
   - Clique em "New Project"
   - Selecione o repositório `digital-products-saas`
   - Clique em "Import"

3. **Configure Variáveis de Ambiente**
   
   Adicione no Vercel:
   ```
   DATABASE_URL=postgresql://...  (use Neon ou Vercel Postgres)
   NEXT_PUBLIC_URL=https://seu-projeto.vercel.app
   
   # Opcional (para IA completa)
   ANTHROPIC_API_KEY=sk-ant-...
   
   # Opcional (para pagamentos)
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde 2-3 minutos
   - Pronto! 🎉

### Opção 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Seguir instruções no terminal
```

## 🗄️ Banco de Dados - Neon (Grátis)

1. Acesse https://neon.tech
2. Crie uma conta
3. Clique em "Create Project"
4. Copie a `DATABASE_URL`
5. Cole no Vercel em Environment Variables

## 🔑 APIs Opcionais

### Claude (IA)
- Acesse: https://console.anthropic.com/
- Crie chave API
- Adicione `ANTHROPIC_API_KEY` no Vercel

### Stripe (Pagamentos)
- Acesse: https://dashboard.stripe.com/
- Copie as chaves de teste ou produção
- Adicione no Vercel:
  - `STRIPE_SECRET_KEY`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## ✅ Checklist Pós-Deploy

- [ ] Site acessível
- [ ] Upload de ZIP funciona
- [ ] Landing pages são geradas
- [ ] Banco de dados conectado
- [ ] (Opcional) IA funcionando
- [ ] (Opcional) Checkout funcionando

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"
- Verifique se `DATABASE_URL` está correta
- Execute `npx prisma db push` localmente primeiro

### Erro: "Module not found"
- Limpe cache: `vercel --force`
- Verifique se todas as dependências estão no package.json

### Site não atualiza
- Force novo deploy: faça um commit vazio
```bash
git commit --allow-empty -m "Force deploy"
git push
```

## 📊 Monitoramento

Acesse: https://vercel.com/[seu-usuario]/[seu-projeto]
- Analytics
- Logs
- Performance

## 🎯 Domínio Customizado

1. No dashboard Vercel
2. Settings → Domains
3. Adicione seu domínio
4. Configure DNS conforme instruções

## 💡 Dicas de Performance

1. **Otimizar Imagens**
   - Use Next/Image
   - Ative Vercel Image Optimization

2. **Cache**
   - CDN automático da Vercel
   - Edge Functions para latência baixa

3. **Banco de Dados**
   - Use connection pooling (Neon tem built-in)
   - Adicione índices nas queries lentas

## 🆘 Suporte

- Documentação: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
