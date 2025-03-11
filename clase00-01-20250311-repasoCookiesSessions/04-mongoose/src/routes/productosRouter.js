import express from 'express';
import { ProductosManager } from '../dao/ProductosManager.js';
import { ProductosMongoManager } from '../dao/ProductosMongoManager.js';
// import { productosModelo } from '../dao/models/productosModel.js';
// import { productos } from '../data/productos.js';
export const router=express.Router()

router.get('/',async(req,res)=>{
    try {
        // let respuesta=ProductosManager.get()
        // let respuesta=await productosModelo.find()
        let respuesta=await ProductosMongoManager.get()
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({respuesta})
        
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
})

router.post("/", async(req, res)=>{
    let {title, price, code}=req.body
    if(!title || !price || !code){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete los datos!!!`})
    }
    
})