import jwt from "jsonwebtoken"
import { config } from "../config/config.js";
import { procesaErrores } from "../utils.js";
export const auth=(req, res, next)=>{
    // if(!req.session.usuario){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(401).json({error:`Unauthorized`})
    // }
    if(!req.headers.authorization){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Unauthorized`})
    }

    try {
        // Bearer token   =>   BEARER asdfasdfa.4awa4334.adsfasdfasd
        let token=req.headers.authorization.split(" ")[1]
        let usuario=jwt.verify(token, config.SECRET)
        req.user=usuario
    } catch (error) {
        return procesaErrores(error, res)
    }

    next()
}