import mongoose, { isValidObjectId } from "mongoose"
import { procesaErrores } from "../utils.js";



export class OrdenesController{
    static async getOrdenes(req, res){
        try {
            let ordenes=`lista todas las ordenes de pedido`
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({ordenes});
        } catch (error) {
            procesaErrores(error, res)
        }
    }

    static async createOrder(req, res){
        let {uid, nid, pedido}=req.body

        if(!uid || !nid || !pedido){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Complete todos los datos`})
        }

        if(!isValidObjectId(uid) || !isValidObjectId(nid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ingrese uid y nid válidos`})
        }

        if(!Array.isArray(pedido)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Formato invalido de pedido`})
        }

        // resto validaciones pertinentes
        try {
            let fecha=new Date()
            let orderId=Date.now()
            let total=9999
            let nuevaOrden={
                orderId, 
                fecha,
                pedido, 
                uid, 
                nid, 
                total
            }

            res.setHeader('Content-Type','application/json');
            return res.status(201).json({payload:`Nueva oc generada para el cliente ${uid}`, nuevaOrden});
        } catch (error) {
            procesaErrores(error, res)
        }
    }
}