import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
import { creaHash, validaPass } from '../utils.js';
export const router=Router()

router.post('/registro',async(req,res)=>{
    let {nombre, email, password} = req.body
    if(!nombre || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`nombre | email | password son requeridos`})
    }

    // validaciones pertinentes
    try {
        let existe=await UsuariosManagerMongo.getBy({email})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Usuario ${email} ya existe en DB`})
        }

        password=creaHash(password)

        let nuevoUsuario=await UsuariosManagerMongo.create({nombre, email, password})
        delete nuevoUsuario.password  // eliminar datos sensibles previo a mostrar la info
        res.setHeader('Content-Type','application/json')
        res.status(201).json({message:"Registro exitoso", nuevoUsuario})

    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error interno del server`})
    }

})

router.post("/login", async(req, res)=>{
    let {email, password}=req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`email | password son requeridos`})
    }


    try {
        let usuario=await UsuariosManagerMongo.getBy({email}) 
        if(!usuario){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }
    
        if(!validaPass(password, usuario.password )){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }

        req.session.usuario=usuario

        delete usuario.password

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({message:"Login exitoso!", usuarioLogueado:usuario});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error interno del servidor`})
    }
})

router.get("/logout", (req, res)=>{
    req.session.destroy(error=>{
        if(error){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error inesperado en proceso de logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso!!!"});
    })
})