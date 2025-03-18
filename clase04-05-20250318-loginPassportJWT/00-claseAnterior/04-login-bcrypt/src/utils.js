import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"
import crypto from "crypto"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

// let prueba="claveSinHash"
// let pruebaHash=crypto.createHmac("sha256", "CoderCoder123").update(prueba).digest("hex")
// console.log(pruebaHash)

export const creaHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validaPass=(pass, hash)=>{
    return bcrypt.compareSync(pass, hash)
}