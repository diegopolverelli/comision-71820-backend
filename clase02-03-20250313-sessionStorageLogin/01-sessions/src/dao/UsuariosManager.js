import { usuarios } from "../data/usuarios.js";

export class UsuariosManager{
    static async getUsuarios(){
        return usuarios
    }
}