import express from 'express';
import { router as sessionsRouter } from './routes/sessionsRouter.js';
import { router as productosRouter } from './routes/productosRouter.js';
import { auth } from './middleware/auth.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/productos", auth, productosRouter)
app.use("/api/sessions", sessionsRouter)

app.get('/',(req,res)=>{


    res.setHeader('Content-Type','text/plain');
    res.status(200).send("OK");
})


app.get('/datos', auth, (req,res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Datos confidenciales"});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
