-- verify.sql
-- Executa checagens pós-migration. Cada SELECT deve retornar a linha esperada.

-- 1) Tabela existe e tem todas as colunas esperadas
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'checklists'
ORDER BY ordinal_position;

-- 2) RLS está habilitada
SELECT relname, relrowsecurity
FROM pg_class
WHERE relname = 'checklists' AND relnamespace = 'public'::regnamespace;

-- 3) Policy anon_insert_checklists existe e permite INSERT para anon
SELECT polname, polcmd, polroles::regrole[]
FROM pg_policy
WHERE polrelid = 'public.checklists'::regclass;

-- 4) Índices criados
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public' AND tablename = 'checklists';
