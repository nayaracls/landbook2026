-- =====================================================
-- SQL PARA CRIAR TABELA DE LEADS - LANDBOOK 2026
-- Execute este código no SQL Editor do Supabase
-- =====================================================

-- 1. Criar a tabela principal
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

-- 2. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_email 
  ON public.leads(email);

CREATE INDEX IF NOT EXISTS idx_leads_created_at 
  ON public.leads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_profile 
  ON public.leads(profile);

-- 3. Ativar segurança (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 4. Permitir inserção pública (formulário web)
CREATE POLICY "Permitir inserção pública de leads" 
  ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- 5. Permitir leitura apenas autenticada (você no dashboard)
CREATE POLICY "Leitura apenas autenticada" 
  ON public.leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- =====================================================
-- PRONTO! Após executar, a tabela estará criada.
-- =====================================================
