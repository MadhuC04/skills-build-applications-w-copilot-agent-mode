import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes/api.js';
const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
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
mongoose.connect(mongoUri)
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
