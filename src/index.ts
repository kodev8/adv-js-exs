import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './infrastructure/mongo-db';
dotenv.config();

import router from './routes/index';

const PORT = process.env.PORT ?? 3000;

const app = express();
connectToMongoDB();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
