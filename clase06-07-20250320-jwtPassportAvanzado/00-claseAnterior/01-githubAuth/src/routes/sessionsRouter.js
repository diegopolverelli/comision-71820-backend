import { Router } from 'express';
import passport from 'passport';
export const router = Router()

router.post("/login", passport.authenticate("login", {}), (req, res)=>{

    // dar de alta el user en req.session
    req.session.usuario=req.user

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({message:"Login exitoso", usuarioLogueado: req.user});

})

router.get('/github', passport.authenticate("github", {}), (req, res) => { })

router.get(
    "/callbackGithub",
    passport.authenticate("github", {}),
    (req, res) => {

        // dar de alta el user en req.session
        req.session.usuario=req.user

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({message:"Login exitoso", usuarioLogueado: req.user});
    }
)

router.get("/logout", (req, res)=>{

    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Fallo proceso logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso"});
    })
})