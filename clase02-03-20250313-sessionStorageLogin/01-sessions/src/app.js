import express from 'express';
import sessions from "express-session"
import { UsuariosManager } from './dao/UsuariosManager.js';
import { auth } from './middlewares/auth.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(sessions({
    secret: "CoderCoder123",
    resave: true, 
    saveUninitialized: true
}))


app.get('/',(req,res)=>{


    res.setHeader('Content-Type','text/plain');
    res.status(200).send("OK");
})

app.get("/login", async(req, res)=>{
    let {user, password}=req.query
    let usuarios=await UsuariosManager.getUsuarios()
    let usuarioLogueado=usuarios.find(u=>u.nombre==user && u.password==password)
    if(!usuarioLogueado){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales inválidas`})
    }

    req.session.usuario=usuarioLogueado

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Login exitoso", usuarioLogueado});
})

app.get("/logout", (req, res)=>{
    req.session.destroy(error=>{
        if(error){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({payload:"Problemas al cerrar sesión"});
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso...!!!"});
    })
})

app.get('/datos', auth, (req,res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Datos confidenciales", 
        consultaRealizadaPor: req.session.usuario.nombre, 
        secret: req.session.usuario.rol=="admin"?"123456":"privilegios insuficientes" 
    });
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
