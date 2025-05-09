import {Router} from "express"

export class CustomRouter{
    #router
    // nombre
    constructor(){
        this.#router=Router()
        // nombre="Juan"
        this.init()
    }

    init(){}

    getRouter(){
        return this.#router
    }

    get(ruta, ...funciones){  // ... son op rest
        // this.#router.get(ruta, this.customResponses, funciones)
        this.#router.get(ruta, this.customResponses, this.procesaFunciones(funciones))
    }

    procesaFunciones=(funciones=[])=>{   // (req, res, next)=>{} o (req, res)=>{}
        return funciones.map(fn=>{
            return async(...args)=>{   // ... son op rest
                try {
                    return await fn(...args)   // ... son op sprad
                } catch (error) {
                    return args[1].internalServerError(`Error interno del servidor - ${error.message}`)
                }
            }
        })
    }

    customResponses=(req, res, next)=>{
        res.success=(texto, datos)=>{
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({status:"OK", message:texto, datos});
        }

        res.badRequest=error=>res.status(400).json({status:"bad Request", error})
        res.unauthorized=error=>res.status(401).json({status:"unauthorized", error})
        res.forbidden=error=>res.status(403).json({status:"forbidden", error})
        res.internalServerError=error=>res.status(500).json({status:"internal server error", error})

        next()
    }
}

// let prueba=new CustomRouter()
// prueba.nombre