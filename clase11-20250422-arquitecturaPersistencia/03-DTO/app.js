import { UsuariosDTO } from "./UsuariosDTO.js"

let usuarios=[
    {id:1, nombre:"Luciana", email:"luciana@test.com", password:"123", rol:"user"},
    {id:2, apellido: "Lopez", nombre:"Juan", email:"juan@test.com", password:"123", rol:"user"},
    {id:3, nombre:"Romina", email:"romina@test.com", password:"123", rol:"admin"},
]

console.log(usuarios[0])
console.log(new UsuariosDTO(usuarios[0]))
console.log(new UsuariosDTO(usuarios[1]))

