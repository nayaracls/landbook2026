# 🔧 Guia de Solução de Problemas - Supabase Landbook 2026

## ❌ Problema: Erro 401 (Unauthorized)

Este erro significa que o Supabase está **rejeitando** a inserção dos dados. Vamos resolver passo a passo.

---

## 🔍 PASSO 1: Verificar se a Tabela Existe e está Configurada Corretamente

### 1.1 Acesse o Supabase Dashboard
1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto **landbook-2026**

### 1.2 Verificar a Tabela
1. Vá em **"Table Editor"** (menu lateral esquerdo)
2. Procure pela tabela **"leads"**
3. **Se a tabela NÃO existe**, você precisa criá-la (veja PASSO 2)

### 1.3 Verificar Estrutura da Tabela (se já existe)
A tabela deve ter estas colunas:
- `id` (bigint, primary key, auto-increment)
- `user_name` (text)
- `company_name` (text)
- `email` (text)
- `whatsapp` (text)
- `profile` (text)
- `answers` (jsonb)
- `created_at` (timestamp)

**Se faltar alguma coluna**, você precisa recriar a tabela.

---

## 🛠️ PASSO 2: Criar/Recriar a Tabela Corretamente

### 2.1 Acessar SQL Editor
1. No Supabase Dashboard, vá em **"SQL Editor"** (ícone de código no menu lateral)
2. Clique em **"+ New query"**

### 2.2 Executar SQL Completo
**⚠️ IMPORTANTE: Se a tabela já existe, você pode pular as primeiras linhas ou usar DROP TABLE primeiro**

Cole este SQL completo e clique em **"Run"**:

```sql
-- Remove a tabela se já existir (CUIDADO: apaga dados existentes!)
-- Descomente a linha abaixo apenas se quiser recriar do zero
-- DROP TABLE IF EXISTS public.leads CASCADE;

-- Cria a tabela de leads
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

-- Cria índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- Habilita RLS (Row Level Security)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas se existirem (para evitar conflito)
DROP POLICY IF EXISTS "Permitir inserção de leads" ON public.leads;
DROP POLICY IF EXISTS "Leitura apenas autenticada" ON public.leads;
DROP POLICY IF EXISTS "Permitir inserção anônima" ON public.leads;

-- Política CRÍTICA: Permite inserção anônima (sem autenticação)
CREATE POLICY "Permitir inserção anônima" ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Política: Permite leitura apenas para usuários autenticados
-- (Você pode ver os dados quando logado no Supabase)
CREATE POLICY "Leitura apenas autenticada" ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);
```

### 2.3 Verificar Sucesso
Você deve ver a mensagem: **"Success. No rows returned"** ✅

---

## 🔑 PASSO 3: Verificar Credenciais do Projeto

### 3.1 Obter URL e Chave Anon
1. No Supabase Dashboard, vá em **"Project Settings"** (ícone de engrenagem ⚙️)
2. Clique em **"API"** (menu lateral dentro de Settings)
3. Você verá duas seções importantes:

#### **Project URL**
- Campo: **"Project URL"**
- Exemplo: `https://zpkkxdxoyvanafwqughr.supabase.co`
- **Copie este valor completo**

#### **API Keys**
- Procure por: **"anon"** ou **"public"** key
- É uma string **MUITO LONGA** começando com: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Copie este valor completo** (cuidado para não cortar!)

---

## 🔐 PASSO 4: Verificar Variáveis de Ambiente no Vercel

### 4.1 Acessar Vercel
1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto **"landbook2026"**

### 4.2 Verificar Variáveis de Ambiente
1. Vá em **"Settings"** → **"Environment Variables"**
2. Verifique se existem **EXATAMENTE** estas 2 variáveis:

| Key | Value (exemplo) |
|-----|-----------------|
| `VITE_SUPABASE_URL` | `https://zpkkxdxoyvanafwqughr.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### 4.3 Se as Variáveis NÃO Existem ou Estão Erradas:
1. Clique em **"Add New"**
2. **Key**: `VITE_SUPABASE_URL`
3. **Value**: Cole a URL do projeto (do PASSO 3.1)
4. **Environments**: Marque **Production**, **Preview** e **Development**
5. Clique em **"Save"**
6. Repita para `VITE_SUPABASE_ANON_KEY`

### 4.4 ⚠️ IMPORTANTE - Após Adicionar/Atualizar:
1. Vá em **"Deployments"** (menu superior)
2. Clique nos **3 pontinhos (⋮)** do último deploy
3. Escolha **"Redeploy"**
4. **IMPORTANTE**: Desmarque **"Use existing Build Cache"**
5. Clique em **"Redeploy"**

**Por que isso é necessário?** O Vercel precisa fazer um novo build para carregar as variáveis de ambiente atualizadas.

---

## 🧪 PASSO 5: Testar Localmente

### 5.1 Verificar Arquivo .env
1. No projeto, abra ou crie o arquivo `.env` na raiz
2. Adicione estas linhas (substitua pelos seus valores reais):

```env
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_COMPLETA_AQUI
```

### 5.2 Reiniciar Servidor de Desenvolvimento
1. Pare o servidor (`Ctrl+C` no terminal)
2. Inicie novamente: `npm run dev`
3. **Importante**: O servidor precisa ser reiniciado para carregar as variáveis do `.env`

### 5.3 Testar
1. Acesse: `http://localhost:5173`
2. Preencha o formulário completamente
3. Finalize o quiz
4. Abra o **Console do Navegador** (F12 → Console)
5. Procure por mensagens:
   - ✅ `✅ Lead salvo com sucesso no Supabase Cloud!` = Sucesso!
   - ❌ `❌ Erro ao salvar lead:` = Ainda há problema

### 5.4 Verificar no Supabase
1. Volte ao Supabase Dashboard
2. Vá em **"Table Editor"** → **"leads"**
3. Você deve ver uma nova linha com seus dados! 🎉

---

## 🔍 PASSO 6: Diagnosticar Problemas no Console

### 6.1 Abrir DevTools
1. No navegador, pressione **F12**
2. Vá na aba **"Console"**

### 6.2 Verificar Mensagens
Procure por estas mensagens:

#### ✅ Mensagem de Sucesso:
```
✅ Lead salvo com sucesso no Supabase Cloud!
```

#### ❌ Mensagens de Erro Comuns:

**Erro 401:**
```
❌ Erro ao salvar lead: {code: 'PGRST301', message: 'new row violates row-level security policy'}
```
**Solução**: A política RLS está bloqueando. Execute o SQL do PASSO 2 novamente.

**Erro 400:**
```
❌ Erro ao salvar lead: {code: '23502', message: 'null value in column "email"'}
```
**Solução**: Verifique se os dados estão sendo enviados corretamente. Pode ser problema no código.

**Erro 404:**
```
Failed to load resource: 404 (Not Found)
```
**Solução**: A URL do Supabase está incorreta. Verifique o PASSO 3.1.

**Mensagem: "⚠️ Supabase não configurado"**
**Solução**: As variáveis de ambiente não estão sendo carregadas. Verifique PASSO 4 e 5.1.

---

## 🔄 PASSO 7: Verificar Código (se ainda não funcionar)

### 7.1 Verificar se as Variáveis Estão Sendo Carregadas
No console do navegador, execute:

```javascript
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Key:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...');
```

**Se aparecer `undefined`**: As variáveis não estão configuradas corretamente.

---

## ✅ Checklist Final

Antes de considerar resolvido, verifique:

- [ ] Tabela `leads` existe no Supabase Table Editor
- [ ] Tabela tem todas as colunas necessárias (user_name, company_name, email, whatsapp, profile, answers, created_at)
- [ ] RLS está habilitado (você pode ver no Table Editor)
- [ ] Política de INSERT anônima foi criada (execute o SQL do PASSO 2)
- [ ] Variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão no Vercel
- [ ] Variáveis estão marcadas para Production, Preview e Development no Vercel
- [ ] Foi feito um redeploy no Vercel após adicionar/atualizar variáveis (sem cache)
- [ ] Arquivo `.env` existe localmente com as variáveis
- [ ] Servidor foi reiniciado após adicionar variáveis no `.env`
- [ ] Console do navegador mostra mensagem de sucesso ao finalizar o quiz

---

## 🆘 Se Nada Funcionar

1. **Copie a mensagem de erro completa** do console (F12)
2. **Tire um print** das variáveis de ambiente no Vercel (sem mostrar as chaves completas)
3. **Verifique no Supabase**:
   - Table Editor → leads (existe a tabela?)
   - SQL Editor → Execute: `SELECT * FROM public.leads LIMIT 1;` (funciona?)

---

## 📞 Próximos Passos

Depois que funcionar:
1. Teste em produção (link do Vercel)
2. Preencha o quiz completamente
3. Verifique no Supabase Table Editor se o lead foi salvo
4. Configure notificações (opcional) para receber alertas de novos leads

---

**Boa sorte! 🚀**

