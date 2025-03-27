import passport from "passport"
import local from "passport-local"
import { UsuariosManagerMongo as UsuariosManager} from "../dao/UsuariosManagerMONGO.js"
import { generaHash, validaHash } from "../utils.js"

export const iniciarPassport=()=>{

    // paso 1
    passport.use("registro", 
        new local.Strategy(
            {
                usernameField:"email", 
                passReqToCallback: true
            },
            async(req, username, password, done)=>{
                try {
                    let {nombre}=req.body
                    if(!nombre){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(400).json({error:`nombre | email | password son requeridos`})
                        return done(null, false)
                    }
                    
                    let existe=await UsuariosManager.getBy({email:username})
                    if(existe){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(400).json({error:`El usuario con email ${email} ya existe en DB`})
                        return done(null, false)
                    }
                    
                    // validaciones pertinentes...
                    password=generaHash(password)
                    let nuevoUsuario=await UsuariosManager.create({nombre, email: username, password})
            
                    // res.setHeader('Content-Type','application/json')
                    // res.status(201).json({message:"Registro exitoso!!!", nuevoUsuario})
                    return done(null, nuevoUsuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use("login", 
        new local.Strategy(
            {
                usernameField:"email"
            },
            async(username, password, done)=>{
                try {
                    let usuario=await UsuariosManager.getBy({email:username})
                    if(!usuario){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(401).json({error:`Credenciales inválidas`})
                        return done(null, false)
                    }
                    if(!validaHash(password, usuario.password)){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(401).json({error:`Credenciales inválidas`})
                        return done(null, false)
                    }

                    return done(null, usuario)
            
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // paso 1'  // solo si uso sessions
    // passport.serializeUser()
    // passport.deserializeUser()

}