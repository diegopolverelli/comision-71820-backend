import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const generarHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validaPass=(pass, hash)=>bcrypt.compareSync(pass, hash)