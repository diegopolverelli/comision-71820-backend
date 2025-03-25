import express from 'express';
import { ProductosManager } from '../dao/ProductosManager.js';
// import { productos } from '../data/productos.js';
export const router=express.Router()

router.get('/',(req,res)=>{
    
    let respuesta=ProductosManager.get()

    res.setHeader('Content-Type','application/json')
    res.status(200).json({respuesta})
})