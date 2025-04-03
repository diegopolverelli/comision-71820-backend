const midd01=(req, res, next)=>{
    console.log(`Middleware 1...!!!`)
    next()
}

const midd02=(req, res, next)=>{
    console.log(`Middleware 2...!!!`)
    next()
}

const midd03=(req, res, next)=>{
    console.log(`Middleware 3...!!!`)
    next()
}

const midd04=(req, res, next)=>{
    console.log(`Middleware 4...!!!`)
    next()
}

const controllerHandler=(req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Prueba...!!!`});
}

export {
    midd01, 
    midd02, 
    midd03, 
    midd04, 
    controllerHandler
}