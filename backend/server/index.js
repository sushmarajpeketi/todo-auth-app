import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
config();

import userRoutes from './routes/userRoutes.js';


const app = express();
app.use(cors());
app.use(json());

app.use('/api', userRoutes);


connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  })
  .catch(err => console.error("error is",err));
app.use((req,res,next)=>{
res.status(404).send("No route found")
})