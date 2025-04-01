import passport from "passport"
import passportJWT from "passport-jwt"
import { SECRET } from "../utils.js"

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
            try {
                return done(null, contenidoToken)
            } catch (error) {
                return done(error)
            }
        }
    ))



    // paso 1'    // solo si uso sessions
    // passport.serializeUser()
    // passport.deserializeUser()


}