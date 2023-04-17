import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { handleGenSQL } from './gen-sql';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || '80';

app.use(express.json());
app.use(cors<Request>());
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server. Che boludo! ⚡️');
});
app.post('/gen-sql', handleGenSQL);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});