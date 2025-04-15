import { juguetes } from "../data/juguetes.js";

export class JuguetesDAO{
    static get(){
        return juguetes
    }

    // getById
    static getById(id){
        let juguete=juguetes.find(j=>j.id==id)
        return juguete
    }

    static create(juguete){
        let id=1
        if(juguetes.length>0){
            id=Math.max(...juguetes.map(d=>d.id))+1
        }
        
        let nuevoJuguete={id, ...juguete}
        juguetes.push(nuevoJuguete)
        return nuevoJuguete
    }

    // update
    // delete
}