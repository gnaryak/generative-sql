# db

To load the contents of .env as environment variables:
`export $(grep -v '^#' .env | xargs)`

To unset those env vars:
`unset $(grep -v '^#' .env | sed -E 's/(.*)=.*/\1/' | xargs)`