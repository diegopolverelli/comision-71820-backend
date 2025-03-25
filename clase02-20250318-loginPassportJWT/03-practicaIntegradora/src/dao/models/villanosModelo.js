import mongoose from "mongoose"
export const villanosModelo=mongoose.model(
    "villanos",
    new mongoose.Schema(
        {
            name:{
                type: String, unique: true
            },
            alias: String
        },
        {
            timestamps:true, strict:false
        }
    )
)