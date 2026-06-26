import express from 'express';
import apiRouter from './routes/api.js';
import connectToDatabase from './config/database.js';

export const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker backend is running.');
});

export async function startServer(): Promise<void> {
  await connectToDatabase();
  console.log('Connected to MongoDB');
  console.log(`API base URL: ${apiBaseUrl}`);
  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on port ${port}`);
  });
}
