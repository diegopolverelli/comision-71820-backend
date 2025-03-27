import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

export const auth=(req, res, next)=>{
    if(!req.headers.authorization){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    try {
        let token=req.headers.authorization.split(" ")[1]        // BEARER TOKEN: BEARER asdfasdf8adsf.asdfasdf8asdf8.asdfasdf
        let usuario=jwt.verify(token, config.SECRET)
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Error token: ${error.message}`})
    }

    next()
}