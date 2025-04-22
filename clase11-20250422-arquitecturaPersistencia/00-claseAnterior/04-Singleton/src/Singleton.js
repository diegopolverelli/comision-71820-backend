import mongoose from "mongoose"

export class Singleton{
    static #conexion=null
    constructor(url, dbName){
        mongoose.connect(url, {dbName})
    }

    static conectaDB(url, dbName){
        if(!this.#conexion){
            this.#conexion=new Singleton(url, dbName)
            console.log(`DB online`)
        }else console.log(`Conexión previamente establecida`)

        return this.#conexion
    }
}

