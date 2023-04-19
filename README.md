# Generative SQL

Wouldn't it be helpful to query your database with natural language prompts? If you had a database of recipes, for example, you could ask questions like:

1. What recipes are for Breakfast?
2. How many recipes has each user authored?
3. What is the oldest recipe?

The OpenAI LLM's (large language models) have the capability to generate SQL queries from natural language prompts. When the structure of the database is included in the prompt, the SQL that is generated is usually valid SQL that can be run against the database. This repo demonstrates these capabilities as a proof of concept.

## Running the generative-sql Server

### Environment

This work was done on macOS 13. Some adaptation (primarily to the shell scripts) will presumably be required to get it to run smoothly on other OS'es, especially Windows.

### Prerequisites

#### Node JS

The code requires Node JS version 18, and the corresponding npm version 8. You will need to install those locally if you don't already have them.

#### PostgreSQL

The code in this repo connects to a PostgreSQL database in order to operate. You can install PostgreSQL locally, or you can point to a hosted database such as AWS RDS or GCP Cloud SQL.

The repo exports the database structure so that we can include it in the prompts we send to OpenAI. We use the `pg_dump` tool to export the structure of the database, so that must be installed locally. If you installed PostgreSQL locally, you will already have it. If not, you will need to install the PostgreSQL client.

_Note: The code in this initial version of the repo uses the PostgreSQL database, but it could easily be adapted to work with any other SQL compliant database engine._

#### OpenAI

We use OpenAI API's to generate the SQL query. Accordingly, the codebase needs an OpenAI API key that points to an active OpenAI account in order to function. If you don't yet have an OpenAI account, you will need to [get one](https://platform.openai.com/signup).

#### .env

The required environment variables must be defined in the `.env` file in the root directory. Refer to `.env.template` for documentation about the variables. These variables allow the system to connect to the PostgreSQL database and to OpenAI.

### Clone this Repo

From a command prompt, clone the repo via SSH with
`git clone git@github.com:gnaryak/generative-sql.git`
or via https with
`git clone https://github.com/gnaryak/generative-sql.git`

### Install dependencies

Run `npm i` from the main `generative-sql` directory. All the subsequent `npm` commands should also be run from this same directory.

### Build the Server Codebase

`npm run build`

This transpiles the Typescript code into Javascript that can be used by Node JS.

### Create the Database Schema

The repo defines a sample database structure and populates it using Knex.js.

* Create the database schema: `npm run db:init`
* Create some sample data: `npm run db:seed`

The provided database schema features `recipe`, `user`, `ingredient`, and `category` tables with relationships between them.

_Note: If you want to re-run the `npm run db:init` script for some reason, you will first need to run `npm run db:uninit`._

_Note: The codebase would work fine with any database schema. We have provided one for convenience but you could easily use your own._

### Export the Database Schema

`npm run db:exportschema`

This creates the file `db/schema.concise.sql` from the database. The contents of this file are included in the prompts sent to the OpenAI API's.

_Note: This script expects the PGDUMP environment variable to be defined in .env._

_Note: If you want to use your own database in this system, you must create `db/schema.concise.sql` that contains the table definitions and relationships. You will also need to ensure that the database exists and is populated, and that the .env properties point to it._

### Start the Server

`npm run start` will start the server normally.

`npm run dev` will start the server in development mode so that it will automatically update itself when files are changed.

The server runs on localhost on the port indicated in the .env file.

## Use the Server

With the server running, in a separate terminal shell, run:

`npm run call`

It should respond with a SELECT statement and the data obtained by running the statement against the database. The file `call-gen-sql.sh` shows the prompt used when calling the server.

## Known Limitations

### The Database Schema is in Every Prompt

The definition of the database schema (from `db/schema.concise.sql`) is included in the prompt of every request to OpenAI. This approach is simple and serves the purposes of this proof of concept but it does have a couple of drawbacks.

1. It causes the prompts to be long, generally around 1,500 tokens, which would be expensive at scale.
2. The schema of a database with many tables would be too big to include in a prompt.

One way to improve this situation would be to fine tune an OpenAI model with the db structure and also with sample prompts. If the model already knew about our specific database structure, we wouldn't need to include it in the prompts. We could also train our fine tuned model to recognize natural language requests that are particularly relevant to the specific database.

In the current exercise I was curious to see how well the standard OpenAI models would be able to generate valid SQL without any special training. Pretty well, it turns out, but a specifically trained model would undoubtedly do better.

### Capitalization

The current system and database are case sensitive. Asking a question like "What recipes have eggs?" will yield no results but "What recipes have Eggs?" will return several recipes. More tolerance of different capitalizations would provide a more satisfying user experience.

The [`citext` datatype in PostgreSQL](https://www.postgresql.org/docs/current/citext.html) looks like a convenient solution to this problem. 

_Please note that this is a proof of concept. The code in this repo is not designed for production usage._
