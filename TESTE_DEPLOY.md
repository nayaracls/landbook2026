# 🧪 Guia de Teste e Deploy

## ✅ Teste Local (Agora)

1. **Servidor já está rodando** - Acesse: http://localhost:5173
2. **Teste completo:**
   - Preencha o formulário inicial
   - Aceite o compromisso
   - Responda as 19 perguntas
   - Veja o diagnóstico
   - Gere o Landbook

## 🚀 Deploy no Vercel

### Passo 1: Commit e Push
```bash
git add .
git commit -m "feat: atualização completa - 19 perguntas, nova lógica e metodologia"
git push origin main
```

### Passo 2: Configurar Variáveis de Ambiente no Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto (provavelmente "landbook-one" ou "landbook2026")
3. Vá em **Settings → Environment Variables**
4. Adicione/Verifique estas 3 variáveis:

| Key | Value |
|-----|-------|
| `VITE_OPENAI_API_KEY` | Sua chave OpenAI (começa com `sk-...`) |
| `VITE_SUPABASE_URL` | URL do seu projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave anon do Supabase |

5. **IMPORTANTE:** Selecione os ambientes:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. Clique em **Save**

### Passo 3: Fazer Redeploy

**Opção A: Redeploy manual**
1. Vá em **Deployments**
2. Clique nos 3 pontos do último deploy
3. Selecione **Redeploy**

**Opção B: Deploy automático**
- Se você fez push, o Vercel já deve estar fazendo deploy automaticamente
- Aguarde 1-2 minutos
- Acesse o link de produção

### Passo 4: Testar em Produção

1. Acesse o link do Vercel (ex: `landbook-one.vercel.app`)
2. Teste o fluxo completo
3. Verifique se o Landbook é gerado corretamente
4. Abra o Console (F12) para verificar erros

## ⚠️ Troubleshooting

### Erro 401 (Unauthorized)
- Verifique se `VITE_OPENAI_API_KEY` está configurada no Vercel
- Verifique se fez redeploy após adicionar a variável
- Verifique se a chave está correta (deve começar com `sk-`)

### Landbook não gera
- Verifique o Console do navegador (F12)
- Veja as mensagens de erro
- Verifique se a chave da API está válida

### Dados não salvam no Supabase
- Verifique se `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão configuradas
- Verifique se a tabela `leads` existe no Supabase

