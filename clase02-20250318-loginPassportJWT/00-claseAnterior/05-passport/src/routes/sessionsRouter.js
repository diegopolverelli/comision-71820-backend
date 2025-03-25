import { Router } from 'express';
import passport from 'passport';
export const router = Router()


// paso 3
router.post(
    '/registro',
    passport.authenticate("registro", {}),
    (req, res) => {

        // si sale ok el passport.authenticate, 
        // passport deja un req.user con los datos del usuario

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({
            message:"Registro exitoso!!!",
            usuarioRegistrado: req.user
        })
    }
)