import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
import authRouter from './routes/authRouter.js';
import connectToDB from './models/dbConnection.js';
connectToDB();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/auth/', authRouter);
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});