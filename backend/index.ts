import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
import authRouter from './routes/authRouter.ts';
import connectToDB from './models/dbConnection.ts';
connectToDB();

app.use(cors());

app.get('/', (_req, res) => {
    res.send('Hello World!');
})

app.use('/auth/', authRouter);
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});