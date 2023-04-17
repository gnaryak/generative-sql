import { Request, Response } from 'express';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { readFile } from 'fs/promises';
import initKnex, { Knex } from 'knex';
import knexConfig from '../db/knexfile';

const knex: Knex = initKnex(knexConfig);

async function createMessages(prompt: string): Promise<ChatCompletionRequestMessage[]> {
  // console.log(`dir: ${__dirname}`);
  const schema: string = await readFile(`${__dirname}/../../db/schema.concise.sql`, 'utf8');
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content: 'You are a concise assistant that writes valid SQL SELECT statements with JOIN, WHERE, GROUP BY, and ORDER BY clauses. Communicate concisely without providing explanations or conversation.'
    },
    {
      role: 'user',
      content: `The database has the following structure:\n\n${schema}`
    },
    {
      role: 'user',
      content: `Write a valid SQL SELECT statement that returns the following:\n\n${prompt}`
    },
  ];
  return messages;
}

function throwQueryError(reason: string): void {
  throw new Error(`Failed to generate SQL query: ${reason}`);
}

async function generateQuery(prompt: string): Promise<string> {
  console.log(`OPENAI_API_KEY: ${process.env.OPENAI_API_KEY}`);
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai: OpenAIApi = new OpenAIApi(configuration);
  // Call the OpenAI API to generate the SQL query
  const messages: ChatCompletionRequestMessage[] = await createMessages(prompt);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.3,
    n: 1,
  });
  console.log(JSON.stringify(completion.data));
  let choice, message;
  try {
    choice = completion?.data?.choices[0];
    message = choice?.message;
  } catch {
    throwQueryError('No query suggested.');
  }
  if (!choice || !message) {
    throwQueryError('No query suggested.');
  }
  if (choice?.finish_reason !== 'stop') {
    throwQueryError(`Finish reason: ${choice?.finish_reason}`);
  }
  if (message?.content?.substring(0, 6) !== 'SELECT') {
    throwQueryError(`Query does not start with SELECT: ${message?.content}`);
  }
  return message?.content ?? '';
}

async function executeQuery(query: string): Promise<any[]> {  
  try {
    const res = await knex.raw(query);
    console.log('success!');
    console.log(res.rows);
    return res.rows;
  } catch(err) {
    console.log('failure!');
    console.log(err);
    throw(err);
  }
}

export async function handleGenSQL(req: Request, res: Response) {
  let query: string;
  try {
    // Get the user's prompt from the request body
    query = await generateQuery(req.body.prompt);
  } catch (err) {
    const msg = {
      prompt: req.body.prompt,
      error: (err as Error).message,
    };
    res.status(500).json(msg);
    return;
  }
  let queryResponse: any[];
  try {
    queryResponse = await executeQuery(query);
  } catch(executeErr) {
    const msg = {
      prompt: req.body.prompt,
      query,
      error: (executeErr as Error).message,
    };
    res.status(500).json(msg);
    return;
  }
  res.json({ query, queryResponse });
};
