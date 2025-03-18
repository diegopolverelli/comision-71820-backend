import { Router } from 'express';
import { HeroesDAO } from '../dao/HeroesDAO.js';
export const router=Router()

router.get('/',async(req,res)=>{

    try {
        let heroes=await HeroesDAO.get()
        res.setHeader('Content-Type','application/json')
        res.status(200).json({heroes})
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
        let existe=await HeroesDAO.getBy({name})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ya existe ${name} en la BD`})
        }        

        let nuevoHeroe=await HeroesDAO.create({name, alias, ...otros})
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({nuevoHeroe});
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