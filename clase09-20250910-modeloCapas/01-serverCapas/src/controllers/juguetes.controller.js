// import { JuguetesDAO } from "../dao/JuguetesDAO.js";
import { juguetesService } from "../services/juguetes.service.js";

export const getJuguetes=async(req, res)=>{
    // let juguetes="todos los juguetes"
    // let juguetes=JuguetesDAO.get()
    let juguetes=await juguetesService.getJuguetes()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({juguetes});
}

export const getJugueteById=async(req, res)=>{
    let {id}=req.params

    // validar tipo de dato... 

    try {
        // let juguete=JuguetesDAO.getById(+id)
        let juguete=await juguetesService.getJugueteById(+id)
        if(!juguete){
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({error:`No existe jueguete con id ${id}`})
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({juguete});
    } catch (error) {
        
    }

}

export const createJuguetes=async(req, res)=>{
    let {nombre, descrip, precio, stock}=req.body
    if(!nombre || !precio){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`nombre y precio son requeridos`})
    }

    // resto de validaciones pertinentes

    // grabar juguete (conectandome a otra capa, la de DAO)
    try {
        // let nuevoJuguete=JuguetesDAO.create({nombre, descrip, precio, stock})
        let nuevoJuguete=await juguetesService.createJuguete({nombre, descrip, precio, stock})

        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:`Se creo el juguete ${nombre}`, nuevoJuguete});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error...!`})
    }


}