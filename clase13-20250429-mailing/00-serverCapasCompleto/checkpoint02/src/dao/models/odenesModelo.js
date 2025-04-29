import mongoose from "mongoose";

export const ordenesModelo=mongoose.model(
    "ordenes", 
    new mongoose.Schema(
        {
            orderId: String, 
            fecha: Date,
            uid: {
                type: mongoose.Types.ObjectId, ref: "usuarios"
            },
            nid: {
                type: mongoose.Types.ObjectId, ref: "negocios",
            },
            pedido:{
                type: [
                    {
                        id: Number, 
                        descrip: String, 
                        precio: Number, 
                        cantidad: Number
                    }
                ]
            }, 
            total: Number, 
        },
        {
            timestamps:true
        }
    )
)