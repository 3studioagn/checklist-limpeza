# Database

Schema e migrations do projeto Checklist de Limpeza.

## Estrutura

- `migrations/001_create_checklists.sql` — cria tabela `checklists`, índices, RLS e policy de INSERT para anon
- `verify.sql` — queries de verificação pós-migration

## Como aplicar

1. Abra o projeto no Supabase Dashboard
2. Vá em **SQL Editor**
3. Cole o conteúdo de `migrations/001_create_checklists.sql` e rode
4. Cole o conteúdo de `verify.sql` para conferir que tudo foi criado corretamente

## Schema da tabela `checklists`

| Coluna             | Tipo        | Notas                                              |
|--------------------|-------------|----------------------------------------------------|
| `id`               | UUID        | PK, gerado automaticamente                         |
| `responsible_name` | TEXT        | Nome do responsável (2-80 chars, sem espaços vazios) |
| `cleaning_date`    | DATE        | Data exibida no formulário (default hoje)          |
| `mesa`             | BOOLEAN     | Limpeza de mesa                                    |
| `monitor`          | BOOLEAN     | Limpeza do monitor                                 |
| `inputs`           | BOOLEAN     | Limpeza de teclado e mouse                         |
| `gabinete`         | BOOLEAN     | Limpeza superficial do gabinete                    |
| `floor_area`       | BOOLEAN     | Limpeza da área sob o gabinete                     |
| `gavetas`          | BOOLEAN     | Limpeza de gavetas                                 |
| `created_at`       | TIMESTAMPTZ | Timestamp do envio (auditoria)                     |

## Segurança (RLS)

- **INSERT**: permitido para `anon` (formulário público)
- **SELECT / UPDATE / DELETE**: bloqueados para `anon` — acessíveis apenas via `service_role` ou Dashboard
