import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import { iniciarPassport } from './config/passport.config.js';

import { router as sessionsRouter } from './routes/sessionsRouter.js';
import { router as vistasRouter } from './routes/vistas.router.js';
import { config } from './config/config.js';

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// paso 2
iniciarPassport()
app.use(passport.initialize())
// app.use(passport.session())  // solo si uso sessions
 
app.use(express.static("./src/public"))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use("/api/sessions", sessionsRouter)
app.use('/', vistasRouter)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const conectar=async()=>{
    try {
        // await mongoose.connect("mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=comis71820clase04")
        await mongoose.connect(
            config.MONGO_URL,
            {
                dbName: config.DB_NAME
            }
        )
        console.log(`Conexión a DB establecida`)
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}

conectar();
