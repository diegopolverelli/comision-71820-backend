import express from 'express';
import sessions from "express-session"
import MongoStore from "connect-mongo"
import { config } from './config/config.js';

import { router as productosRouter } from './routes/productosRouter.js';
import { router as sessionsRouter } from './routes/sessionsRouter.js';
import { auth } from './middleware/auth.js';

const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(sessions({
    secret: config.SECRET,
    resave: true, 
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        dbName: config.DB_NAME
        // ttl: 3600,
    })
}))

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
