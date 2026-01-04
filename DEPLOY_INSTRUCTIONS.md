# 🚀 Instruções de Deploy - Landbook 2026

## ✅ Checklist Pré-Deploy

- [x] Dependências adicionadas ao `package.json`:
  - `framer-motion`: ^11.11.17
  - `html2canvas`: ^1.4.1
  - `jspdf`: ^2.5.2

## 📝 Passos para Deploy no Vercel

### 1. Commit e Push das Alterações

Se você usa Git, faça commit das alterações:

```bash
git add .
git commit -m "Atualização: 3 metodologias, 5 prompts, PDF otimizado"
git push origin main
```

### 2. Deploy via Vercel Dashboard

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto **landbook2026**
3. Clique em **"Deployments"** → **"Redeploy"** (ou aguarde deploy automático se conectado ao GitHub)

### 3. Verificar Variáveis de Ambiente

No Vercel, vá em **Settings** → **Environment Variables** e confirme que estão configuradas:

| Key | Descrição |
|-----|-----------|
| `VITE_OPENAI_API_KEY` | Sua chave da OpenAI (deve começar com `sk-`) |
| `VITE_SUPABASE_URL` | URL do seu projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave anon do Supabase |

⚠️ **Importante**: Após adicionar/alterar variáveis, faça um **novo deploy**.

### 4. Verificar Build

Após o deploy, verifique:
- ✅ Build concluído com sucesso (verde)
- ✅ URL da aplicação funcionando
- ✅ Todas as funcionalidades testadas

## 🔍 O que foi Atualizado nesta Versão

- ✅ 3 metodologias ágeis (em vez de 5)
- ✅ 5 prompts estratégicos (em vez de 13)
- ✅ PDF otimizado para ser idêntico ao navegador
- ✅ Dependências atualizadas (framer-motion, html2canvas, jspdf)
- ✅ Diagnóstico mais detalhado e profundo
- ✅ Títulos corrigidos (sem "gamificada")
- ✅ Renderização de cards e prompts preservada

## 🐛 Troubleshooting

### Build falha no Vercel
- Verifique se todas as dependências estão no `package.json`
- Confirme que o Node.js está na versão 18+ (Vercel usa 18.x por padrão)

### Variáveis de ambiente não funcionam
- Certifique-se que começam com `VITE_`
- Faça redeploy após adicionar/alterar variáveis
- Verifique se não há espaços extras nos valores

### Erro de API
- Verifique se `VITE_OPENAI_API_KEY` está correta
- Confirme que a chave começa com `sk-`
- Veja logs de erro no Vercel (Deployments → View Function Logs)


