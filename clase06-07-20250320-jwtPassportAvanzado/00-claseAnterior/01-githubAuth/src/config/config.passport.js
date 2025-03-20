import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import { UsuariosMongoManager } from "../dao/UsuariosMongoManager.js"

export const initPassport = () => {

    // paso 1
    passport.use("login", new local.Strategy(
        {
            // usernameField:"email",
        },
        async(username, password, done)=>{
            try {
                if(username!="admin" || password!="CoderCoder123"){
                    return done(null, false)
                }

                return done(null, {nombre: "Administrador", rol:"admin", _id:"123"})
            } catch (error) {
                return done(error)
            }
        }
    ))

    // paso 1
    passport.use("github", new github.Strategy(
        {
            clientID:"Iv23li1WM9UtcxUfevFj",
            clientSecret:"8ea07b3c2258b80b7c648187ceb42d01be0ceee7",
            callbackURL:"http://localhost:3000/api/sessions/callbackGithub"
        },
        async(t1, t2, profile, done )=>{
            try {
                // console.log(profile)
                let nombre=profile._json.name
                let email=profile._json.email
                if(!email || !nombre){
                    return done(null, false)
                }
                let usuario=await UsuariosMongoManager.getBy({email})
                if(!usuario){
                    usuario=await UsuariosMongoManager.create({nombre, email, profile})
                }

                return done(null, usuario)


            } catch (error) {
                return done(error)
            }
        }
    ))

    // paso 1' (solo si sessions)
    passport.serializeUser((usuario, done) => {
        return done(null, usuario._id)
    })

    passport.deserializeUser(async (id, done) => {
        let usuario = await UsuariosMongoManager.getBy({ _id: id })
        return done(null, usuario)
    })


}