let divContent=document.getElementById("content")

fetch("/api/sessions/perfil",{
    headers:{
        "Authorization":`BEARER ${localStorage.getItem("token")}`
    }
}).then(res=>{
    if(res.status>=400){
        divContent.innerHTML=`<h3>Error...</h3>`
        throw new Error("Error autenticación")
    }
    return res.json()
}).then(data=>{
    console.log(data)
    divContent.innerHTML=`
    <h2>Perfil de ${data.payload.nombre}</h2>
    <hr>
    <p>Correo electrónico: <strong>${data.payload.email}</strong></p>

        <ul>
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/registro.html">Registro</a>
        </li>
        <li>
            <a href="/login.html">Login</a>
        </li>
        <li>
            <a href="/perfil.html">Perfil</a>
        </li>
        <li>
            <a href="/login.html">Logout</a>
        </li>
    </ul>
    
    `
}).catch(e=>{
    console.log(e.message)
    setTimeout(() => {
        window.location.href="/login.html"
    }, 3000);
})