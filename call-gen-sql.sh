#!/bin/bash

# The script works properly wherever it is run from
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Read env vars from .env file
set -o allexport && . "$SCRIPT_DIR/.env" && set +o allexport

# There is a hard-coded prompt in this script.
# The prompt can be changed, or you can make ad hoc calls to the server
# using different prompts.
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"prompt": "what recipes are for Breakfast?"}' \
  "http://localhost:$PORT/gen-sql"