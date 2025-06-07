import express, { urlencoded } from 'express';
import cors from 'cors';
import productRoutes from './routes/products/index';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000; //changed port to be configurable vis env file
const app = express();

app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('At root of API');
  // console.log("root of API");
});

app.use('/products', productRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
