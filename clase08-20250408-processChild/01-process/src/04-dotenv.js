// process.loadEnvFile("./src/.env")
// import dotenv from "dotenv"

// dotenv.config({
//     path:"./src/.env", 
//     override: true
// })

// console.log(process.env.PRUEBA_PORT)
// console.log(process.env.PORT)
// console.log(process.env.MONGO_URL)

import express from 'express';
import { config } from './config/04-config.js';
const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
