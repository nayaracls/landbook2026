-- =====================================================
-- CORREÇÃO DO ERRO 401 - SUPABASE LANDBOOK 2026
-- Execute este SQL no SQL Editor do Supabase
-- =====================================================

-- 1. Garantir que a tabela existe
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

-- 2. Criar índices
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- 3. Habilitar RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 4. REMOVER políticas antigas que podem estar causando conflito
DROP POLICY IF EXISTS "Permitir inserção de leads" ON public.leads;
DROP POLICY IF EXISTS "Leitura apenas autenticada" ON public.leads;
DROP POLICY IF EXISTS "Permitir inserção pública de leads" ON public.leads;
DROP POLICY IF EXISTS "Permitir inserção anônima" ON public.leads;

-- 5. Criar política CORRIGIDA para permitir inserção anônima
-- Esta é a política mais permissiva para permitir INSERT sem autenticação
CREATE POLICY "Permitir inserção anônima" 
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 6. Política para leitura (você pode ver os dados quando logado)
CREATE POLICY "Leitura apenas autenticada" 
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- ✅ PRONTO! Agora teste novamente preenchendo o quiz.
-- =====================================================

-- VERIFICAÇÃO: Execute esta query para ver se a política foi criada:
-- SELECT * FROM pg_policies WHERE tablename = 'leads';

