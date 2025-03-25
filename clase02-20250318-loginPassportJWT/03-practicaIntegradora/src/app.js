import express from 'express';
import mongoose from 'mongoose';

import { router as heroesRouter } from './routes/heroesRouter.js';
import { router as villanosRouter } from './routes/villanosRouter.js';
import { config } from './config/config.js';
const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/heroes", heroesRouter)
app.use("/api/villanos", villanosRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


const connDB=async()=>{
    try {
        await mongoose.connect(
            config.MONGO_URL,
        {
            dbName: config.DB_NAME
        }
        )
        console.log("DB conectada...!!!")
    } catch (error) {
        console.log(`Error al conectar a DB: ${error}`)
    }
}
connDB()