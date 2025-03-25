import { Router } from 'express';
import { UsuariosManager } from '../dao/UsuariosManager.js';
import jwt from "jsonwebtoken"
import { config } from '../config/config.js';
import { procesaErrores } from '../utils.js';
export const router=Router()

router.post('/login',async(req,res)=>{
    let {username, password}=req.body
    if(!username || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`username | password son requeridos`})
    }

    try {
        let usuarios=await UsuariosManager.getUsuarios()
        let usuario=usuarios.find(u=>u.nombre==username && u.password==password)
        if(!usuario){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales invalidas`})
        }
        
        // console.log(fafafa)

        let token=jwt.sign(usuario, config.SECRET, {expiresIn: 60*5})
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({message:"Login exitoso", usuarioLogueado:usuario, token})
    } catch (error) {
        procesaErrores(error, res)
    }
})