# 🚀 Guia Passo a Passo - Configurar Supabase (Corrigir Erro 401)

## 📋 Resumo do Problema

O erro **401 (Unauthorized)** acontece quando o Supabase bloqueia a inserção de dados. Isso geralmente é causado por:
1. ❌ Política RLS (Row Level Security) bloqueando inserções anônimas
2. ❌ Variáveis de ambiente não configuradas corretamente
3. ❌ Tabela não existe ou está com estrutura incorreta

---

## ✅ SOLUÇÃO PASSO A PASSO

### 🔧 **PASSO 1: Corrigir Políticas RLS no Supabase**

Este é o passo **MAIS IMPORTANTE** para resolver o erro 401.

1. **Acesse o Supabase Dashboard:**
   - Vá em: https://supabase.com/dashboard
   - Selecione seu projeto

2. **Abra o SQL Editor:**
   - No menu lateral esquerdo, clique em **"SQL Editor"** (ícone de código `</>`)
   - Clique em **"+ New query"**

3. **Cole e Execute este SQL:**
   ```sql
   -- Execute o arquivo: supabase_fix_401.sql
   -- Ou cole o conteúdo completo desse arquivo aqui
   ```

   **OU** copie e cole diretamente:

   ```sql
   -- Garantir que a tabela existe
   CREATE TABLE IF NOT EXISTS public.leads (
     id BIGSERIAL PRIMARY KEY,
     user_name TEXT NOT NULL,
     company_name TEXT NOT NULL,
     email TEXT NOT NULL,
     whatsapp TEXT NOT NULL,
     profile TEXT NOT NULL,
     answers JSONB NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Remover políticas antigas
   DROP POLICY IF EXISTS "Permitir inserção de leads" ON public.leads;
   DROP POLICY IF EXISTS "Leitura apenas autenticada" ON public.leads;
   DROP POLICY IF EXISTS "Permitir inserção pública de leads" ON public.leads;
   DROP POLICY IF EXISTS "Permitir inserção anônima" ON public.leads;

   -- Criar política CORRIGIDA
   CREATE POLICY "Permitir inserção anônima" 
     ON public.leads
     FOR INSERT
     TO anon, authenticated
     WITH CHECK (true);
   ```

4. **Clique em "Run"** (ou pressione Ctrl+Enter)

5. **Verifique o resultado:**
   - Deve aparecer: **"Success. No rows returned"** ✅

---

### 🔑 **PASSO 2: Verificar e Copiar Credenciais do Supabase**

1. **No Supabase Dashboard:**
   - Clique em **"Project Settings"** (ícone de engrenagem ⚙️ no menu lateral)
   - Clique em **"API"** (dentro de Settings)

2. **Copie a URL do Projeto:**
   - Campo: **"Project URL"**
   - Exemplo: `https://zpkkxdxoyvanafwqughr.supabase.co`
   - **Copie este valor completo** (Ctrl+C)

3. **Copie a Chave Anon:**
   - Procure por: **"anon"** ou **"public"** key
   - É uma string MUITO LONGA começando com `eyJhbGciOiJIUzI1NiIs...`
   - **⚠️ CUIDADO**: Copie a chave COMPLETA (geralmente tem ~200 caracteres)
   - Clique no ícone de "cópia" ou selecione tudo (Ctrl+A, Ctrl+C)

---

### 🔐 **PASSO 3: Configurar Variáveis no Vercel**

1. **Acesse o Vercel:**
   - Vá em: https://vercel.com/dashboard
   - Selecione o projeto **"landbook2026"**

2. **Vá em Settings → Environment Variables:**
   - Menu lateral: **"Settings"**
   - Clique em **"Environment Variables"**

3. **Verificar se existem as variáveis:**
   - Procure por `VITE_SUPABASE_URL`
   - Procure por `VITE_SUPABASE_ANON_KEY`

4. **Se NÃO existirem ou estiverem erradas:**

   **a) Adicionar VITE_SUPABASE_URL:**
   - Clique em **"Add New"**
   - **Key**: `VITE_SUPABASE_URL`
   - **Value**: Cole a URL que você copiou (PASSO 2.2)
   - **Environments**: Marque TODAS as opções:
     - ☑ Production
     - ☑ Preview  
     - ☑ Development
   - Clique em **"Save"**

   **b) Adicionar VITE_SUPABASE_ANON_KEY:**
   - Clique em **"Add New"** novamente
   - **Key**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Cole a chave anon que você copiou (PASSO 2.3)
   - **Environments**: Marque TODAS as opções:
     - ☑ Production
     - ☑ Preview
     - ☑ Development
   - Clique em **"Save"**

5. **⚠️ IMPORTANTE - Fazer Redeploy:**
   - Vá em **"Deployments"** (menu superior)
   - Clique nos **3 pontinhos (⋮)** do último deploy
   - Escolha **"Redeploy"**
   - **DESMARQUE**: "Use existing Build Cache" ❌
   - Clique em **"Redeploy"**
   
   **Por quê?** O Vercel precisa fazer um novo build para carregar as variáveis atualizadas.

---

### 🧪 **PASSO 4: Testar Localmente (Opcional mas Recomendado)**

1. **Criar arquivo `.env` na raiz do projeto:**
   - Crie um arquivo chamado `.env` (sem extensão)
   - Adicione estas linhas:

   ```env
   VITE_SUPABASE_URL=https://SUA_URL_AQUI.supabase.co
   VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_COMPLETA_AQUI
   ```

   **Substitua** pelos valores que você copiou no PASSO 2.

2. **Reiniciar o servidor:**
   - Pare o servidor: `Ctrl+C`
   - Inicie novamente: `npm run dev`
   - ⚠️ **Importante**: Reiniciar é necessário para carregar variáveis do `.env`

3. **Testar:**
   - Acesse: `http://localhost:5173`
   - Preencha o quiz completamente
   - Abra o Console (F12 → Console)
   - Procure por: `✅ Lead salvo com sucesso no Supabase Cloud!`

---

### ✅ **PASSO 5: Verificar se Funcionou**

1. **No Supabase Dashboard:**
   - Vá em **"Table Editor"** (menu lateral)
   - Clique na tabela **"leads"**
   - Você deve ver os dados salvos! 🎉

2. **No Console do Navegador (F12):**
   - Deve aparecer: `✅ Lead salvo com sucesso no Supabase Cloud!`
   - **NÃO deve aparecer**: `❌ Erro ao salvar lead`

---

## 🔍 **DIAGNÓSTICO: Se Ainda Não Funcionar**

### Verificar no Console (F12):

1. **Abra o Console do Navegador:**
   - Pressione `F12`
   - Vá na aba **"Console"**

2. **Procure por estas mensagens:**

   **✅ Sucesso:**
   ```
   ✅ Lead salvo com sucesso no Supabase Cloud!
   ```

   **❌ Erros Comuns:**

   **Erro RLS (Row Level Security):**
   ```
   ❌ Erro ao salvar lead: {code: 'PGRST301', message: 'new row violates row-level security policy'}
   ```
   **Solução**: Execute o PASSO 1 novamente (SQL Editor)

   **Variáveis não configuradas:**
   ```
   ⚠️ Supabase não configurado
   VITE_SUPABASE_URL: ❌ Não encontrado
   ```
   **Solução**: Configure as variáveis no Vercel (PASSO 3) e faça redeploy

   **Tabela não existe:**
   ```
   ❌ Erro: relation "public.leads" does not exist
   ```
   **Solução**: Execute o SQL do PASSO 1 para criar a tabela

---

## 📋 **CHECKLIST FINAL**

Antes de considerar resolvido, verifique:

- [ ] ✅ SQL do PASSO 1 foi executado no Supabase SQL Editor
- [ ] ✅ Política RLS "Permitir inserção anônima" foi criada
- [ ] ✅ Variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão no Vercel
- [ ] ✅ Variáveis estão marcadas para Production, Preview e Development
- [ ] ✅ Foi feito um redeploy no Vercel (sem cache) após configurar variáveis
- [ ] ✅ Console do navegador mostra mensagem de sucesso ao finalizar quiz
- [ ] ✅ Dados aparecem no Supabase Table Editor → leads

---

## 🆘 **PRECISA DE AJUDA?**

Se após seguir todos os passos ainda não funcionar:

1. **Copie a mensagem de erro completa** do console (F12)
2. **Verifique no Supabase**:
   - Table Editor → leads (existe a tabela?)
   - SQL Editor → Execute: `SELECT * FROM pg_policies WHERE tablename = 'leads';` (vê as políticas?)

3. **Verifique no Vercel**:
   - Settings → Environment Variables (as variáveis estão lá?)
   - Deployments → Último deploy (foi feito após configurar variáveis?)

---

**Boa sorte! 🚀**

