import { usuariosModelo } from "./models/usuarios.modelo.js";

export class UsuariosManagerMongo{

    static async create(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON()
    }

    static async getBy(filtro){   // {nombre:"Juan"}
        return await usuariosModelo.findOne(filtro).lean()  // .lean transforma la rts de mongoose en un objeto plain de JS
    }

}