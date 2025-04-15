import express from 'express';
import mongoose from "mongoose"
import { router as usuariosRouter } from './routes/usuarios.router.js';
import { router as juguetesRouter } from './routes/juguetes.router.js';
import { config } from './config/config.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/usuarios", usuariosRouter)
app.use("/api/juguetes", juguetesRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

try {
    await mongoose.connect(config.MONGO_URL, 
        {
            dbName: config.DB_NAME
        }
    )
    console.log(`DB online!`)
} catch (error) {
    console.log(`Error al conectar a DB`)
}
