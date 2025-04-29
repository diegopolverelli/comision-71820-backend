import mongoose from "mongoose";

export const procesaErrores=(error, res)=>{
    console.log(error);
    res.setHeader('Content-Type','application/json');
    return res.status(500).json(
        {
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle:`${error.message}`
        }
    )
}

export const conectarDB=async(uri, dbName)=>{
    try {
        await mongoose.connect(
            uri, 
            {dbName}
        )
        console.log(`DB online!`)
    } catch (error) {
        console.log(`Error al conectar a DB`)
    }
}