import fs from "fs"

const path="./src/logs/error.log"
export const procesaErrores=(error, res)=>{
    // console.log(error);
    const data={
        fecha: new Date(), 
        error: error.message,
        detalle: error.stack
    }
    let logs
    if(fs.existsSync(path)){
        logs=JSON.parse(fs.readFileSync(path, "utf-8"))
        // logs.push(data)
        // fs.writeFileSync(path, JSON.stringify(logs, null, 5))
        // fs.appendFileSync(path, JSON.stringify(logs, null, 5))
    }else{
        logs=[]
    }
    logs.push(data)
    fs.writeFileSync(path, JSON.stringify(logs, null, 5))
    res.setHeader('Content-Type','application/json');
    return res.status(500).json(
        {
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            // detalle:`${error.message}` 
        }
    )
}