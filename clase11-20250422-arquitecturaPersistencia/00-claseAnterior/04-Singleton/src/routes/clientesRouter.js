import { Router } from 'express';
import mongoose from 'mongoose';
import { Singleton } from '../Singleton.js';
export const router=Router()

router.get('/',async(req,res)=>{
    Singleton.conectaDB(
        "mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        "comisPruebas"
    )

    let clientes=await mongoose.connection.collection("clientes").find().toArray()

    res.setHeader('Content-Type','application/json')
    res.status(200).json({clientes})
})