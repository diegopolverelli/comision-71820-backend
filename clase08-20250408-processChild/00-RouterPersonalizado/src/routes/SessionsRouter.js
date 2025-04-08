import { config } from "../config/config.js";
import { CustomRouter } from "./router.js";
import jwt from "jsonwebtoken"

let usuarios=[
    {id:1, nombre:"Luciana", email:"luciana@test.com", password:"123", rol:"user"},
    {id:2, nombre:"Juan", email:"juan@test.com", password:"123", rol:"user"},
    {id:3, nombre:"Romina", email:"romina@test.com", password:"123", rol:"admin"},
]

export class SessionsRouter extends CustomRouter{
    init(){
        this.post("/login", ["public"], (req, res)=>{
            let {username, password}=req.body

            let usuario=usuarios.find(u=>u.nombre==username && u.password==password)
            if(!usuario){
                return res.unauthorized(`Credenciales invalidas`)
            }

            let token=jwt.sign(usuario, config.SECRET, {expiresIn: "1h"})

            return res.success(`Login exitoso`, token)
        })
    }
}