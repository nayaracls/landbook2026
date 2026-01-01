# 🗄️ Guia de Configuração do Supabase - Landbook 2026

## 📋 PASSO 1: Criar Projeto no Supabase

1. Acesse: https://supabase.com/dashboard
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: `landbook-2026`
   - **Database Password**: Crie uma senha forte (anote!)
   - **Region**: `South America (São Paulo)` (mais próximo do Brasil)
4. Clique em **"Create new project"** e aguarde ~2 minutos

---

## 🛠️ PASSO 2: Criar a Tabela de Leads

1. No painel do Supabase, vá em **"SQL Editor"** (ícone de código no menu lateral)
2. Clique em **"+ New query"**
3. Cole o SQL abaixo e clique em **"Run"**:

```sql
-- Cria a tabela de leads
CREATE TABLE public.leads (
  id BIGSERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  profile TEXT NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cria índice para buscar por email rapidamente
CREATE INDEX idx_leads_email ON public.leads(email);

-- Cria índice para ordenar por data
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);

-- Habilita RLS (Row Level Security) - segurança básica
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política: Permite inserção anônima (necessário para o formulário público)
CREATE POLICY "Permitir inserção de leads" ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Política: Apenas você (autenticado) pode ler os dados
CREATE POLICY "Leitura apenas autenticada" ON public.leads
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

4. Você verá: **"Success. No rows returned"** ✅

---

## 🔑 PASSO 3: Copiar Credenciais do Projeto

1. No menu lateral, clique em **"Project Settings"** (ícone de engrenagem)
2. Vá em **"API"**
3. Copie os seguintes valores:

### **URL do Projeto**
- Copie o campo **"Project URL"**
- Exemplo: `https://xyzabc123.supabase.co`

### **Chave Pública (anon/public)**
- Copie o campo **"anon" / "public"** (key)
- É uma string longa começando com: `eyJhbGciOiJIUzI1...`

---

## 🔐 PASSO 4: Configurar Variáveis de Ambiente

### **Localmente (desenvolvimento)**

1. Abra o arquivo `.env.development` (já existe no projeto)
2. Adicione as linhas abaixo, substituindo pelos seus valores:

```env
VITE_SUPABASE_URL=https://COLE_SUA_URL_AQUI.supabase.co
VITE_SUPABASE_ANON_KEY=COLE_SUA_CHAVE_ANON_AQUI
```

3. Salve o arquivo (`Ctrl+S`)

### **No Vercel (produção)**

1. Acesse: https://vercel.com/dashboard
2. Clique no projeto **"landbook2026"**
3. Vá em **"Settings" → "Environment Variables"**
4. Adicione **2 variáveis**:

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | Cole a URL do projeto |
| `VITE_SUPABASE_ANON_KEY` | Cole a chave anon |

5. Clique em **"Save"**

---

## ✅ PASSO 5: Testar Integração Local

1. Pare o servidor (`Ctrl+C` no terminal)
2. Reinicie: `npm run dev`
3. Preencha o formulário completamente
4. Após finalizar o quiz, vá no Supabase:
   - **"Table Editor" → "leads"**
   - Você deve ver **1 linha** com seus dados! 🎉

---

## 🚀 PASSO 6: Deploy no Vercel

Após configurar as variáveis de ambiente no Vercel:

1. Faça um novo commit:
```bash
git add .
git commit -m "feat: supabase integration"
git push origin main
```

2. O Vercel detectará automaticamente e fará o deploy (~1-2 min)
3. Acesse o link de produção e teste novamente

---

## 📊 Visualizar Dados Salvos

### **Opção 1: Interface do Supabase (Recomendado)**
- Acesse: **"Table Editor" → "leads"**
- Veja todos os registros em tempo real

### **Opção 2: SQL Query**
```sql
SELECT 
  user_name,
  company_name,
  email,
  profile,
  created_at
FROM public.leads
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🛡️ Segurança Configurada

✅ **RLS Ativo**: Apenas inserção pública, leitura autenticada  
✅ **HTTPS**: Todas as conexões criptografadas  
✅ **Chave Anon**: Segura para exposição no frontend  
✅ **JSONB**: Respostas do quiz armazenadas estruturadamente  

---

## 🆘 Problemas Comuns

### **Erro: "Failed to save lead"**
- Verifique se as variáveis `VITE_SUPABASE_*` estão corretas
- Reinicie o servidor (`npm run dev`)

### **Dados não aparecem na tabela**
- Confirme que o SQL foi executado sem erros
- Verifique se a política RLS está ativa

### **Erro 401 no Vercel**
- As variáveis de ambiente no Vercel foram configuradas?
- Após adicionar, faça um novo deploy (push)

---

## 📈 Próximos Passos (Opcional)

1. **Dashboard Analítico**: Criar views no Supabase
2. **Webhook**: Notificação no WhatsApp quando houver novo lead
3. **Export CSV**: Botão para baixar todos os leads

---

**Tudo pronto!** 🎊 Agora cada pessoa que preencher o Landbook será salva automaticamente no banco.
