import { ordenesModelo } from "./models/odenesModelo.js";

export class OrdenesDAO{
    static async get(){
        return await ordenesModelo.find().lean()
    }

    static async create(orden){
        let nuevaOrden=await ordenesModelo.create(orden)
        return nuevaOrden.toJSON()
    }
}