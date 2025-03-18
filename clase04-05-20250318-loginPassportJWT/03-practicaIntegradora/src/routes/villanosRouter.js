import { Router } from 'express';
import { VillanosDAO } from '../dao/VillanosDAO.js';
export const router=Router()

router.get('/',async(req,res)=>{

    try {
        let villanos=await VillanosDAO.get()
        res.setHeader('Content-Type','application/json')
        res.status(200).json({villanos})
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }

})


router.post("/", async(req, res)=>{
    let {name, alias, ...otros}=req.body
    if(!name){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete name`})
    }

    try {
        let existe=await VillanosDAO.getBy({name})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ya existe ${name} en la BD`})
        }        

        let nuevoVillano=await VillanosDAO.create({name, alias, ...otros})
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({nuevoVillano});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
})