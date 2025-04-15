// import { usuarios } from "../data/usuarios.js";

import { usuariosModelo } from "./models/usuariosModelo.js"

export class UsuariosDAOMongo{

    constructor(){}

    get(){
        // return usuarios
        return usuariosModelo.find()
    }

    getById(id){
        // let usuario=usuarios.find(u=>u.id==id)
        return usuariosModelo.findOne({_id:id})
    }

    create(usuario){
        // let id=1
        // if(usuarios.length>0){
        //     id=Math.max(...usuarios.map(d=>d.id))+1
        // }

        // let nuevoUsuario={
        //     id, ...usuario   // ... son el operador spread
        // }

        // usuarios.push(nuevoUsuario)

        return usuariosModelo.create(usuario)
    }

    // resto crud: update y delete
}