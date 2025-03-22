import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();
app.use(routes);
app.use(cors());
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use(errorHandler);

app.use(notFoundHandler);

export default app;
