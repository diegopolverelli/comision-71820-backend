import { Router } from 'express';
import { auth } from '../middleware/auth.js';
export const router=Router()

router.get('/',(req,res)=>{

    res.status(200).render('home')
})

router.get('/login',(req,res)=>{

    res.status(200).render('login')
})

router.get('/perfil', auth, (req,res)=>{

    let {nombre, email}=req.session.usuario

    res.status(200).render('perfil',
        {nombre, email}
    )
})

