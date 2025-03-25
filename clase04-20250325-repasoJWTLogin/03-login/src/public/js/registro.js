let divMensajes=document.getElementById("mensajes")

let params=new URLSearchParams(window.location.search)
let mensaje=params.get("mensaje")
if(mensaje){
    divMensajes.textContent=mensaje
    setTimeout(() => {
        divMensajes.textContent=""
    }, 3000);
}

let inputNombre=document.getElementById("nombre")
let inputEmail=document.getElementById("email")
let inputPassword=document.getElementById("password")
let btnRegistro=document.getElementById("btnRegistro")


btnRegistro.addEventListener("click", async(e)=>{
    e.preventDefault()
    let data={
        nombre: inputNombre.value, 
        email: inputEmail.value, 
        password: inputPassword.value 
    }
    if(!data.nombre || !data.email || !data.password){
        divMensajes.textContent="Todos los datos son requeridos!"
        setTimeout(() => {
            divMensajes.textContent=""
        }, 3000);
        return 
    }

    let respuesta=await fetch("/api/sessions/registro", {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    if(respuesta.status>=400){
        let {error}=await respuesta.json()
        // console.log(error)
        divMensajes.textContent="Error en el proceso de registro. "+error
        setTimeout(() => {
            divMensajes.textContent=""
        }, 5000);
        return     
    }
    let datos=await respuesta.json()
    window.location.href=`/login.html?mensaje=Registro exitoso para ${datos.nuevoUsuario.nombre}`

})

