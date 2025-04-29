import { usuariosModelo } from "./models/usuariosModelo.js";

export class UsuariosDAO{
    static async get(){
        return await usuariosModelo.find().populate("ordenes.ordenId").lean()
    }

    static async getBy(filtro={}){   // {nombre:"Juan"}
        return await usuariosModelo.findOne(filtro).lean()
    }

    static async create(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON()
    }

    static async update(id, usuario){
        return await usuariosModelo.findByIdAndUpdate(id, usuario, {new: true, })
    }
}