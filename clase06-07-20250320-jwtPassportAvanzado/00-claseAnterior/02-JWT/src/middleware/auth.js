import jwt from "jsonwebtoken"
import { config } from "../config/config.js";
export const auth=(req, res, next)=>{
    if(!req.headers.authorization){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay credenciales`})
    }

    // Bearer Token
    // "Bearer asdfasdfas.asdfasdfasdfasdf.33sasfasdfasdf"
    let token=req.headers.authorization.split(" ")[1]

    let usuario
    try {
        usuario=jwt.verify(token, config.SECRET)
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Error de autenticación: ${error.message}`})
    }


    next()
}