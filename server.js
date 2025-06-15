import './config.js'; // 👈 Load environment variables early
import cors from 'cors';

import express from 'express';
import queryRouter from './routes/query-route.js';

const app = express();

// Use Express's built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/query', queryRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
