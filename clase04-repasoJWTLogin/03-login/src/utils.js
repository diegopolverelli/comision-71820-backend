import fs from "fs"
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const generaHash=password=>bcrypt.hashSync(password, 10)
export const validaHasw=(pass, hash)=>bcrypt.compareSync(pass, hash)


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