import express from 'express';
import { controllerHandler, midd01, midd02, midd03, midd04 } from './middlewares/middlewares.js';
import {HeroesRouter} from "./routes/heroesRouter.js"
import { SessionsRouter } from './routes/SessionsRouter.js';
import { config } from './config/config.js';

const heroesRouter=new HeroesRouter()
const sessionsRouter=new SessionsRouter()

// const PORT=3000;
const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/sessions", sessionsRouter.getRouter())
app.use("/api/heroes", heroesRouter.getRouter())

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get("/prueba1", midd01, midd02, midd03, midd04, (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"prueba1"});
})


app.get("/prueba2", midd01, midd02, midd03, midd04, controllerHandler)

let funciones=[midd01, midd02, midd03, midd04, controllerHandler]
console.log(funciones)

app.get("/prueba3", funciones)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
