-- 001_create_checklists.sql
-- Cria a tabela de checklists de limpeza do workstation e configura RLS pública para INSERT.
-- Idempotente: pode ser executado mais de uma vez sem erro.

CREATE TABLE IF NOT EXISTS public.checklists (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  responsible_name TEXT        NOT NULL CHECK (char_length(trim(responsible_name)) BETWEEN 2 AND 80),
  cleaning_date    DATE        NOT NULL DEFAULT CURRENT_DATE,
  mesa             BOOLEAN     NOT NULL DEFAULT FALSE,
  monitor          BOOLEAN     NOT NULL DEFAULT FALSE,
  inputs           BOOLEAN     NOT NULL DEFAULT FALSE,
  gabinete         BOOLEAN     NOT NULL DEFAULT FALSE,
  floor_area       BOOLEAN     NOT NULL DEFAULT FALSE,
  gavetas          BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_checklists_created_at
  ON public.checklists (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_checklists_cleaning_date
  ON public.checklists (cleaning_date DESC);

ALTER TABLE public.checklists ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_checklists" ON public.checklists;
CREATE POLICY "anon_insert_checklists"
  ON public.checklists
  FOR INSERT
  TO anon
  WITH CHECK (true);
