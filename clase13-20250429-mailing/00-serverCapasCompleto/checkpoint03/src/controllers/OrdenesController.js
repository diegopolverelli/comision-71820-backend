import mongoose, { isValidObjectId } from "mongoose"
import { procesaErrores } from "../utils.js";
import { OrdenesDAO as ordenesService } from "../dao/OrdenesDAO.js";
import { NegociosDAO as negociosService } from "../dao/NegociosDAO.js";
import { UsuariosDAO as usuariosService } from "../dao/UsuariosDAO.js";

export class OrdenesController{
    static async getOrdenes(req, res){
        try {
            // let ordenes=`lista todas las ordenes de pedido`
            let ordenes=await ordenesService.get()
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
            let total=0

            let usuario=await usuariosService.getBy({_id:uid})
            let negocio=await negociosService.getBy({_id:nid})
            if(!usuario){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existen usuarios con id ${uid}`})
            }
            if(!negocio){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existe bar con id ${nid}`})
            }

            let error=false
            let detalleErrores=[]
            pedido.forEach(i=>{
                let producto=negocio.productos.find(pr=>pr.id==i.id)
                if(producto){
                    i.precio=producto.precio
                    i.decrip=producto.descrip
                    total+=i.precio * i.cantidad
                }else{
                    error=true
                    detalleErrores.push(`No existen productos con id ${i.id} en el menú del bar ${negocio.nombre}`)
                }
            })

            if(error){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Error con el pedido`, detalleErrores})
            }



            let nuevaOrden=await ordenesService.create({
                orderId, 
                fecha,
                pedido, 
                uid, 
                nid, 
                total
            })

            usuario.ordenes.push({ordenId: nuevaOrden._id})
            await usuariosService.update(uid, usuario)

            res.setHeader('Content-Type','application/json');
            return res.status(201).json({payload:`Nueva oc generada para el cliente ${uid}`, nuevaOrden});
        } catch (error) {
            procesaErrores(error, res)
        }
    }
}