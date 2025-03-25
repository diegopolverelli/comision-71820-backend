import { Router } from 'express';
import { generaHash, procesaErrores } from '../utils.js';
import { UsuariosManagerMongo as UsuariosManager } from '../dao/UsuariosManagerMONGO.js';
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