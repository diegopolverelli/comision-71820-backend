import { usuariosModelo } from "./models/usuario.model.js";

export class UsuariosMongoManager{
    static async create(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON()
    }

    static async getBy(filtro={}){
        return await usuariosModelo.findOne(filtro)
    }
}