import { Router } from 'express';
import { UsuariosManager } from '../dao/UsuariosManager.js';
export const router=Router()



router.post('/login',async(req,res)=>{
    let {username, password}= req.body
    if(!username || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`username y password son requeridos`})
    }

    try {
        let usuarios=await UsuariosManager.getUsuarios()
        let usuario=usuarios.find(u=>u.nombre==username && u.password==password)
        if(!usuario){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }
        
        req.session.usuario=usuario
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({message:"Login exitoso", usuarioLogueado: usuario})
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error...`})
    }
})

router.get("/logout", (req, res)=>{
    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error al realizar logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso!!!"});
    })
})