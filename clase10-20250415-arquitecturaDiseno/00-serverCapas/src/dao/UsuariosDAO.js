import { usuarios } from "../data/usuarios.js";

export class UsuariosDAO{

    constructor(){}

    get(){
        return usuarios
    }

    getById(id){
        let usuario=usuarios.find(u=>u.id==id)
        return usuario
    }

    create(usuario){
        let id=1
        if(usuarios.length>0){
            id=Math.max(...usuarios.map(d=>d.id))+1
        }

        let nuevoUsuario={
            id, ...usuario   // ... son el operador spread
        }

        usuarios.push(nuevoUsuario)

        return nuevoUsuario
    }

    // resto crud: update y delete
}