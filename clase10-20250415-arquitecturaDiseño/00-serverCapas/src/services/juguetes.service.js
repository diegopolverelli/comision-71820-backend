// import { JuguetesDAO } from "../dao/JuguetesDAO.js"
import { JuguetesDAOMongo as JuguetesDAO } from "../dao/JuguetesDAOMongo.js"

class JuguetesService{
    constructor(dao){
        this.juguetesDAO=dao
    }

    async getJuguetes(){
        return await this.juguetesDAO.get()
    }

    async getJugueteById(id){
        return await this.juguetesDAO.getById(id)
    }

    async createJuguete(juguete){
        return await this.juguetesDAO.create(juguete)
    }
}

export const juguetesService=new JuguetesService(JuguetesDAO)