import mongoose from "mongoose";

export const usuariosModelo=mongoose.model(
    'usuarios',
    new mongoose.Schema(
        {
            nombre: String, 
            email: {
                type: String, unique:true
            }, 
            apellido: String, 
            password: String,
        },
        {
            timestamps:true
        }
    )
)