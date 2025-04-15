// import { UsuariosDAO } from "../dao/UsuariosDAO.js"
import { UsuariosDAOMongo as UsuariosDAO } from "../dao/UsuariosDAOMongo.js"

class UsuariosService{
    constructor(dao){
        this.usuariosDAO=dao
    }

    getUsuarios(){
        return this.usuariosDAO.get()
    }

    getUsuarioById(id){
        return this.usuariosDAO.getById(id)
    }

    agregarUsuario(usuario){
        return this.usuariosDAO.create(usuario)
    }
}

export const usuariosService=new UsuariosService(new UsuariosDAO())