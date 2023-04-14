#!/bin/bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"prompt": "what recipes are for Breakfast?"}' \
  "http://localhost:8000/gen-sql"