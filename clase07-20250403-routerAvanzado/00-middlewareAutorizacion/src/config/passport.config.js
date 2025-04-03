import passport from "passport"
import passportJWT from "passport-jwt"
import local from "passport-local"
import { SECRET } from "../utils.js"
import fs from "fs"

const buscarToken=(req)=>{
    let token

    if(req.cookies.token){
        console.log(`Paso por buscarToken de passport`)
        token=req.cookies.token
    }

    return token
}

export const inicilizarPassport=()=>{

    // paso 1
    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: SECRET,
            jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([buscarToken])
        },
        async(contenidoToken, done)=>{

            // return done(null, false)

            try {
                if(contenidoToken.nombre=="Juan"){
                    return done(null, false, {message:`El usuario Juan tiene el acceso temporalmente inhabilitado - contacte al administrador`})
                }
                return done(null, contenidoToken)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {
            usernameField:"email"
        },
        async(username, password, cb)=>{
            try {
                let usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))

                let usuario = usuarios.find(u => u.email === username && u.password === password)
                if (!usuario){
                    return cb(null, false, {message:`Credenciales inválidas`})
                } 

                return cb(null, usuario)

            } catch (error) {
                return cb(error)
            }
        }
    ))


    // paso 1'    // solo si uso sessions
    // passport.serializeUser()
    // passport.deserializeUser()


}