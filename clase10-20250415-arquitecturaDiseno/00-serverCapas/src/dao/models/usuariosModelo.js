import mongoose from "mongoose";

export const usuariosModelo=mongoose.model(
    "usuarios",
    new mongoose.Schema(
        {
            nombre: String,
            email: {
                type: String, unique:true
            },
            password: String, 
            rol:{
                type:String, default: "user"
            }
        },
        {
            timestamps: true, 
            strict: true, 
            // collection: "usuarios2021",
        }
    )
)