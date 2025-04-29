import express from 'express';
import cors from "cors"
import { router as usuariosRouter } from './routes/usuariosRouter.js';
import { router as ordenesRouter } from './routes/ordenesRouter.js';
import { router as negociosRouter } from './routes/negociosRouter.js';
import { conectarDB } from './utils.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use("/api/negocios", negociosRouter)
app.use("/api/usuarios", usuariosRouter)
app.use("/api/ordenes", ordenesRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

conectarDB(
    "mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    "comis71820clase12"
)