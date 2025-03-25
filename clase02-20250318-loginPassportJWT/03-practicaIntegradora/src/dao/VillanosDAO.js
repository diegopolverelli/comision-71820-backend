import { villanosModelo } from "./models/villanosModelo.js"

export class VillanosDAO{
    static async get(){
        return await villanosModelo.find().lean()
    }

    static async getBy(filtro={}){
        return await villanosModelo.findOne(filtro).lean()
    }

    static async create(villano={}){
        return (await villanosModelo.create(villano)).toJSON()
    }
}