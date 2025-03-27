import { Router } from 'express';
import jwt from "jsonwebtoken"
import { generaHash, procesaErrores, validaHash } from '../utils.js';
import { UsuariosManagerMongo as UsuariosManager } from '../dao/UsuariosManagerMONGO.js';
import { config } from '../config/config.js';
import { auth } from '../middleware/auth.js';
export const router=Router()

router.post('/registro',async(req,res)=>{
    let {nombre, email, password}=req.body
    if(!nombre || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`nombre | email | password son requeridos`})
    }

    try {
        let existe=await UsuariosManager.getBy({email})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El usuario con email ${email} ya existe en DB`})
        }
        
        // validaciones pertinentes...
        password=generaHash(password)
        let nuevoUsuario=await UsuariosManager.create({nombre, email, password})

        res.setHeader('Content-Type','application/json')
        res.status(201).json({message:"Registro exitoso!!!", nuevoUsuario})
    } catch (error) {
        procesaErrores(error, res)
    }
    

})

router.post("/login", async(req, res)=>{
    let {email, password}=req.body
    try {
        let usuario=await UsuariosManager.getBy({email})
        if(!usuario){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }
        if(!validaHash(password, usuario.password)){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }
        console.log(usuario)
        console.log(Object.keys(usuario))
        // console.log(Object.keys(usuario.toJSON()))
        
        
        delete usuario.password  // eliminar todos los datos confidenciales o sensibles previo a mostrarlo
        let token=jwt.sign(usuario, config.SECRET, {expiresIn: 60*10})
    
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({
            message:"Login exitoso", 
            usuarioLogueado: usuario, 
            token
        });
    } catch (error) {
        procesaErrores(error, res)
    }
})

router.get("/perfil", auth, async(req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:req.user});
})