import { Router } from 'express';
export const router = Router()

// router.get('*', (req, res) => {
//     res.send('Rutas en mantenimineto. Pruebe en unos minutos')
// })

router.get('/numero/:numero([0-9]+)', (req, res) => {

    let { numero } = req.params
    numero = +numero * 3


    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ dato: numero })
})

router.get('/palabra/:palabra([a-zA-Z%C3%B1%20]+)', (req, res) => {

    let { palabra } = req.params


    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ dato: palabra })
})

router.get('/nombre/:nombre([a-zA-Z%C3%B1%20]+)', (req, res) => {

    let { nombre } = req.params


    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ nombre })
})

router.get('/ab?cd', (req, res) => {
    res.send('ab?cd')
})

let errores={
    a:"error de datos", 
    b:"error de hardware",
    c:"error de seguridad"
}

router.param("codigo", (req, res, next, codigo)=>{
    let descrip="error indeterminado"
    if(errores[codigo]){
        descrip=errores[codigo]
    }

    req.errorDescrip=descrip
    next()
})


router.get("/error/:codigo", (req, res)=>{

    // let {codigo}=req.params

    // let descrip="error indeterminado"
    // if(errores[codigo]){
    //     descrip=errores[codigo]
    // }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Se ha reportado un ${req.errorDescrip}`});
})


router.get("/error/:usuario/:codigo", (req, res)=>{

    // let {usuario, codigo}=req.params
    let {usuario}=req.params

    // let descrip="error indeterminado"
    // if(errores[codigo]){
    //     descrip=errores[codigo]
    // }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`${usuario} ha reportado un ${req.errorDescrip}`});
})


router.get('*', (req, res) => {
    res.send('No existe la ruta solicitada')
})