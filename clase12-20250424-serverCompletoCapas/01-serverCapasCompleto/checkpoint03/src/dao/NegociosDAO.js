import { negociosModelo } from "./models/negociosModelo.js";

export class NegociosDAO{
    static async get(){
        return negociosModelo.find().lean()
    }

    static async getBy(filtro={}){   // {nombre:"Bar yyy"}
        return await negociosModelo.findOne(filtro).lean()
    }

    static async create(negocio){
        let nuevoNegocio=await negociosModelo.create(negocio)
        return nuevoNegocio.toJSON()
    }
}