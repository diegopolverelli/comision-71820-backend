export default class UsuariosController{
    static getUsuarios(req,res){

        // petición a DB
        // procesos varios...
        let usuarios="todos los usuarios"
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({usuarios})
    }

    static createUsuario(req, res){
        let {nombre, email}=req.body
        if(!nombre || !email){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`nombre | email son requeridos`})
        }

        // validaciones
        // ej. existe ya el usuario???

        // grabar usuario
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:`Se generó el usuario ${email}`});

    }
}