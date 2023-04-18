#!/bin/bash

# The script works properly wherever it is run from
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Read env vars from .env file
set -o allexport && . "$SCRIPT_DIR/../.env" && set +o allexport

# Get the table definitions from the database
"$PGDUMP" \
  --schema-only \
  --schema=recipes \
  --no-owner \
  postgres \
  > "$SCRIPT_DIR/schema.verbose.sql"

# Remove blank lines and comments so that we can send immportant info to OpenAI more concisely
sed -e '/^\s*--.*$/d' -e '/^\s*$/d' "$SCRIPT_DIR/schema.verbose.sql" \
  > "$SCRIPT_DIR/schema.concise.sql"

echo "Updated $SCRIPT_DIR/schema.concise.sql"