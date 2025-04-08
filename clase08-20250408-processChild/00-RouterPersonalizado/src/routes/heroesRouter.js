import { midd01 } from "../middlewares/middlewares.js";
import { CustomRouter } from "./router.js"

export class HeroesRouter extends CustomRouter{
    init(){
        this.get("/", ["public"], (req, res)=>{

            let {error} =req.query
            if(error){
                return res.badRequest(`Parametros incorrectos`)
            }

            // res.setHeader('Content-Type','application/json');
            // return res.status(200).json({payload:"Lista todos los heroes"});
            return res.success("Lista todos los heroes", ["Batman", "Robin"])
        })

        this.get("/:id", ["user", "manager"], midd01, (req, res)=>{
            let {id} = req.params

            // res.setHeader('Content-Type','application/json');
            // return res.status(200).json({payload:"Lista el heroe con id "+id});
            return res.success(`Lista el heroe con id ${id}`, {name:"Batman"})
        })

        this.get("/error/error", ["ADMIN"], midd01, (req, res)=>{

            // throw new Error("Error de prueba...!!!")

            // res.setHeader('Content-Type','application/json');
            // return res.status(200).json({payload:"Lista el heroe con id "+id});
            return res.success(`ruta error`)
        })

    }
}