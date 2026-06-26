import express from 'express';
import apiRouter from './routes/api.js';
import connectToDatabase from './config/database.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
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

connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    console.log(`API base URL: ${apiBaseUrl}`);
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
