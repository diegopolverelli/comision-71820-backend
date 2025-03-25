import passport from "passport"
import local from "passport-local"
import { UsuariosManagerMongo } from "../dao/UsuariosManagerMONGO.js"
import { generarHash } from "../utils.js"

export const iniciarPassport=()=>{

    // paso 1
    passport.use("registro", new local.Strategy(
        {usernameField: "email", passReqToCallback:true},
        async(req, username, password, done)=>{
            try {
                // logica de registro... 
                let {nombre}=req.body
                if(!nombre){
                    console.log("no mandaste nombre...!!!")
                    return done(null, false)
                }

                // resto de validaciones pertinentes... 

                let existe=await UsuariosManagerMongo.getBy({email:username})
                if(existe){
                    console.log("usuario repetido", existe.email)
                    return done(null, false)
                }

                password=generarHash(password)
                let usuario=await UsuariosManagerMongo.create({nombre, email: username, password})
                return done(null, usuario)

            } catch (error) {
                return done(error)
            }
        }
    ))


    // paso 1'
    // cuando utilizo sessions
    passport.serializeUser((user, done)=>{
        return done(null, user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario=await UsuariosManagerMongo.getBy({_id:id})
        return done(null, usuario)
    })
}