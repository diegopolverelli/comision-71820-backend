import { procesaErrores } from "../utils.js"

export const getNegocios=async(req, res)=>{
    try {
        let negocios="listado negocios"
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({negocios});
    } catch (error) {
        procesaErrores(error, res)
    }
}

export const createNegocio=(req, res)=>{
    let {nombre, productos}=req.body
    if(!nombre || !productos){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`nombre | productos son requeridos`})
    }

    // resto validaciones pertinentes
    if(!Array.isArray(productos)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Productos debe ser un array`})
    }

    try {
        // validar existencia negocio

        let nuevoNegocio=`Nuevo negocio generado: ${nombre}`
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:`Negocio creado con éxito`, nuevoNegocio});
    } catch (error) {
        procesaErrores(error, res)
    }
}