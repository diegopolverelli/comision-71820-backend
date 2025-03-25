import mongoose from "mongoose";

export const productosModelo=mongoose.model(
    "productos",
    new mongoose.Schema(
        {
            title: String,
            price: {
                type: Number, 
                default:0
            }, 
            code: {
                type: String, 
                unique: true
            }
        },
        {
            timestamps: true
        }
    )   
)

// productosModelo.insertOne