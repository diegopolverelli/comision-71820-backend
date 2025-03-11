export const log=(req, res, next)=>{
    console.log(`Fecha: ${new Date().toLocaleDateString()}  |  url: ${req.url}`)

    req.codigo=100

    next()
}

export const format=(req, res, next)=>{
    if(req.query.nombre){
        req.query.nombre=req.query.nombre.toUpperCase()
    }

    next()
}

const log2=(req, res, next)=>{
    console.log(`otro logger...!!!`)
    next()
}

const nombre="JUAN"
const edad=28

export default log2
export {
    nombre, edad
}