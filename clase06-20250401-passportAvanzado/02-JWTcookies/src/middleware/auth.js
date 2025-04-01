import jwt from "jsonwebtoken"
import { SECRET } from "../utils.js";

export const auth=(req, res, next)=>{
    // if(!req.headers.authorization){
    if(!req.cookies.token){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Unauthorized`})
    }

    // Bearer asdfasdf.asdfasdfsadf.4asdffasf
    // let token=req.headers.authorization.split(" ")[1]
    let token=req.cookies.token

    try {
        let usuario=jwt.verify(token, SECRET)
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Unauthorized`, detalle: error.message})    
    }
    next()
}