import {Router} from "express"
import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

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

    get(ruta, permisos=[], ...funciones){  // ... son op rest
        // this.#router.get(ruta, this.customResponses, funciones)
        this.#router.get(ruta, this.customResponses, this.auth(permisos), this.procesaFunciones(funciones))
    }

    post(ruta, permisos=[], ...funciones){  // ... son op rest
        // this.#router.get(ruta, this.customResponses, funciones)
        this.#router.post(ruta, this.customResponses, this.auth(permisos), this.procesaFunciones(funciones))
    }

    put(ruta, permisos=[], ...funciones){  // ... son op rest
        // this.#router.get(ruta, this.customResponses, funciones)
        this.#router.put(ruta, this.customResponses, this.auth(permisos), this.procesaFunciones(funciones))
    }

    delete(ruta, permisos=[], ...funciones){  // ... son op rest
        // this.#router.get(ruta, this.customResponses, funciones)
        this.#router.delete(ruta, this.customResponses, this.auth(permisos), this.procesaFunciones(funciones))
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

    auth(permisos=[]){
        return (req, res, next)=>{
            if(!Array.isArray(permisos)) return res.internalServerError(`Error de permisos en ruta solicitada`)

            permisos=permisos.map(p=>p.toLowerCase())

            if(permisos.includes("public")) return next()

            if(!req.headers.authorization) return res.unauthorized(`No hay usuarios autenticados`)
            
            // BEARER 234345sdfsdfgsdfg.dfgsdfg4.sdfgsdfgdsg
            let token=req.headers.authorization.split(" ")[1]

            let usuario
            try {
                usuario=jwt.verify(token, config.SECRET)
                req.user=usuario
            } catch (error) {
                return res.unauthorized(`${error.message}`)
            }

            if(!permisos.includes(usuario.rol.toLowerCase())){
                return res.forbidden(`No tiene privilegios suficentes para acceder al recurso solicitado`)
            }

            next()
        }
    }
}

// let prueba=new CustomRouter()
// prueba.nombre