import mongoose from "mongoose"

export const conectar=async()=>{
    try {
        await mongoose.connect(
            "mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            {dbName:"comis71820clase01"}
        )
        console.log(`DB online!`)
    } catch (error) {
        console.log(`Error al conectar DB`)
    }
}


