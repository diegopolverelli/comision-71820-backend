let divMensajes=document.getElementById("mensajes")
try {
    localStorage.removeItem("token")
} catch (error) {
    divMensajes.textContent=`Fallo en el proceso de logout`
    setTimeout(() => {
        divMensajes.textContent=""
    }, 5000);  
}


let params=new URLSearchParams(window.location.search)
let mensaje=params.get("mensaje")
if(mensaje){
    divMensajes.textContent=mensaje
    setTimeout(() => {
        divMensajes.textContent=""
    }, 5000);
}

let inputEmail=document.getElementById("email")
let inputPassword=document.getElementById("password")
let btnLogin=document.getElementById("btnLogin")


btnLogin.addEventListener("click", async(e)=>{
    e.preventDefault()
    let data={
        email: inputEmail.value, 
        password: inputPassword.value 
    }
    if(!data.email || !data.password){
        divMensajes.textContent="Todos los datos son requeridos!"
        setTimeout(() => {
            divMensajes.textContent=""
        }, 3000);
        return 
    }

    let respuesta=await fetch("/api/sessions/login", {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    if(respuesta.status>=400){
        let {error}=await respuesta.json()
        // console.log(error)
        divMensajes.textContent="Error en el proceso de login. "+error
        setTimeout(() => {
            divMensajes.textContent=""
        }, 5000);
        return     
    }
    let datos=await respuesta.json()
    console.log(datos)
    localStorage.setItem("token", datos.token)
    window.location.href=`/perfil.html`

})

