import express from 'express';
import cors from "cors"
import otrolog, { log, format, nombre } from './middlewares/log.js';
import { auth } from './middlewares/auth.js';
// import log2 from './middlewares/log.js'
const PORT=3000;

const app=express();


app.use(express.static("./src/public"))
app.use(cors())
app.use(express.json());   
app.use(express.urlencoded({extended:true}));
app.use(log)
app.use(otrolog)

app.get('/',(req,res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/saludo', format, (req,res)=>{
    // req.query

    let {nombre} = req.query
    if(!nombre){
        nombre=""
    }

    console.log(req.codigo)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Buen día...!!! "+nombre});
})

app.get('/nombre', auth, (req,res)=>{
    // req.query

    res.status(200).send("Juan")
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

