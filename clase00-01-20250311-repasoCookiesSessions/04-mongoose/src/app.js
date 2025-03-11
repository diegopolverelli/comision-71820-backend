import express from 'express';
import { router as clientesRouter } from './routes/clientes.router.js';
import { router as productosRouter } from './routes/productosRouter.js';
import { conectar } from './connDB.js';
const PORT=3000;

const app=express();

app.use(express.json());   
app.use(express.urlencoded({extended:true}));
app.use("/api/clientes", clientesRouter)
app.use("/api/productos", productosRouter)

app.get('/',(req,res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

// /saludo/juan
// /saludo/el10

app.get('/saludo/:nombre',(req,res)=>{
    // req.query

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Buen día...!!!"});
})

app.get('/saludo/:alias',(req,res)=>{
    // req.query

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Buen día...!!!"});
})

app.get('/nombre',(req,res)=>{
    // req.query

    res.status(200).send("Juan")
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

conectar()

