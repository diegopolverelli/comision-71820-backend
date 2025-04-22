export class UsuariosDTO{
    constructor(usuario){
        this.first_name=usuario.nombre.toUpperCase()
        this.last_name=usuario.apellido?usuario.apellido.toUpperCase():"-"
        // this.email=usuario.email
        this.role=usuario.rol
        this.username=usuario.email.split("@")[0].toUpperCase()
        this.code=90000+usuario.id
        this.fullName=`${this.first_name} ${this.last_name}`
    }
}