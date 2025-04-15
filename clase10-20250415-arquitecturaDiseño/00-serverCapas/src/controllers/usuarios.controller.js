import { isValidObjectId } from "mongoose";
import { usuariosService } from "../services/usuarios.service.js";

export default class UsuariosController{
    static async getUsuarios(req,res){

        // petición a DB
        // procesos varios...
        // let usuarios="todos los usuarios"
        try {
            let usuarios=await usuariosService.getUsuarios()
        
            res.setHeader('Content-Type','application/json')
            res.status(200).json({usuarios})
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`${error.message}`})
        }
    }

    static getUserById=async(req, res)=>{
        let {id}=req.params
        // logica, validaciones, formateo de datos, etc. 
        if(!isValidObjectId(id)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Indique un id de tipo Id MongoDB`})
        }
        // solicitudes al manager.
        try {
            let usuario=await usuariosService.getUsuarioById(id)
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:`Lista usuario ${req.params.id}`, usuario});
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`${error.message}`})

        }

    
    }

    static async createUsuario(req, res){
        let {nombre, email}=req.body
        if(!nombre || !email){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`nombre | email son requeridos`})
        }

        
        try {
            // validaciones
            // ej. existe ya el usuario???
            let usuarios=await usuariosService.getUsuarios()
            let existe=usuarios.find(u=>u.email==email)
            if(existe){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`El usuario con email ${email} ya existe en DB`})
            }
            // grabar usuario
            let nuevoUsuario=await usuariosService.agregarUsuario({nombre, email})
            res.setHeader('Content-Type','application/json');
            return res.status(201).json({payload:`Se generó el usuario ${email}`, nuevoUsuario});
            
        } catch (error) {
            
        }

    }
}