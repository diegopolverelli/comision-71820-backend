const divData=document.getElementById("data")

const getData=async()=>{
    let rta=await fetch("http://localhost:3000/data")
    let datos=await rta.json()
    divData.textContent=datos.payload
}