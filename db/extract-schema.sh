#!/bin/bash
/opt/homebrew/opt/postgresql@15/bin/pg_dump \
  --schema-only \
  --schema=recipes \
  --no-owner \
  postgres \
  > schema.verbose.sql

sed -e '/^\s*--.*$/d' -e '/^\s*$/d' schema.verbose.sql > schema.concise.sql