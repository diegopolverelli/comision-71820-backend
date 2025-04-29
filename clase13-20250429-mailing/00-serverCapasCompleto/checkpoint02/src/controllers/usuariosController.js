import { procesaErrores } from "../utils.js"
import mongoose, { isValidObjectId } from "mongoose"

export const getUsuarios=async(req,res)=>{
    try {
        let usuarios="listado de usuarios"
        
        res.setHeader('Content-Type','application/json')
        res.status(200).json({usuarios})
    } catch (error) {
        return procesaErrores(error, res)
    }
}

export const getUsuarioById=async(req,res)=>{
    let {uid}=req.params
    if(!isValidObjectId(uid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`id inválido de mongodb`})
    }

    try {
        let usuario=`Lista usuario con id ${uid}`
        
        res.setHeader('Content-Type','application/json')
        res.status(200).json({usuario})
    } catch (error) {
        return procesaErrores(error, res)
    }
}

export const createUser=(req, res)=>{
    let {nombre, email}=req.body
    if(!nombre || !email){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`nombre | email son requeridos`})
    }

    // otras validaciones... 

    try {
        // validar existencia del usuario

        let nuevoUsuario="nuevo usuario generado: "+email
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:`Usuario generado con éxito`, nuevoUsuario});
    } catch (error) {
        procesaErrores(error, res)
    }

}