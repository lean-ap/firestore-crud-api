import express, {json,urlencoded} from 'express';
import cors from 'cors';
import productRoutes from './routes/products/index';

const PORT = 3000;
const app = express();

app.use(urlencoded({extended: false}));

app.use(json());

app.get('/', (req, res) => {
    res.send("At root of API");
    console.log("root of API");
});



app.use('/products', productRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});
