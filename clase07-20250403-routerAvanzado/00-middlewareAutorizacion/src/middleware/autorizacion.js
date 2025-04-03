export const autorizacion = (rol="")=>{
    return (req, res, next)=>{
        if(!req.user){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Unauthorized`})
        }

        if(rol.toLowerCase()=="public" || rol.length==0) return next()
        
        // if(req.user.rol=="admin") return next()

        if(req.user.rol!=rol){
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recurso solicitado`})
        }

        next()
    }
}