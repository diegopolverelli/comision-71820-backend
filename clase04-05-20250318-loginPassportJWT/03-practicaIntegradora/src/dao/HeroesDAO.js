import { heroesModelo } from "./models/heroesModelo.js";

export class HeroesDAO{
    static async get(){
        return await heroesModelo.find().lean()
    }

    static async getBy(filtro={}){
        return await heroesModelo.findOne(filtro).lean()
    }

    static async create(heroe={}){
        return (await heroesModelo.create(heroe)).toJSON()
    }
}