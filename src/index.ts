import express, { urlencoded } from 'express';
import cors from 'cors';
// imports for security middleware
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import productRoutes from './routes/products/index';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { closeDbConnection } from './db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000; //changed port to be configurable vis env file
const app = express();

app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// added security middleware here
// Helmet sets various HTTP headers to help protect app
// from well-known web vulnerabilities
app.use(helmet());

// Rate limiter middleware to prevent abuse:
// Limits each IP to max 100 requests per 15-minute window
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from IP - please try later',
});
app.use(limiter);
app.use(logger);

app.get('/', (req, res) => {
  res.send('At root of API');
  // console.log("root of API");
});

app.use('/products', productRoutes);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//Graceful shutdown
/*
 not needed for firestore but added for cleanup, future proofing, 
 logging, debugging, cleanly close server properly, handle ssytem signals.
*/

const gracefulShutdown = async () => {
  console.log('[Shutdown] Gracefully shutting down ..');
  try {
    await closeDbConnection();
    server.close(() => {
      console.log('[Shutdown] HTTP server closed.');
      process.exit(0);
    });
  } catch (error) {
    console.error('[Shutdown] Error during shutdown:', error);
    process.exit(1);
  }
};

//listen for termination signals
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
