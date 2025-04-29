// vsvz kmid hhfz ujml
import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        service: "gmail",
        // host: "miempresa.com.ar/email",
        port: 587,
        auth: {
            user: "diegopolverelli@gmail.com",
            pass: "vsvz kmid hhfz ujml"
        }
    }
)

const enviar=()=>{
    return transporter.sendMail(
        {
            subject: `Prueba envío mail simple`,
            from: `Diego Polverelli diegopolverelli@gmail.com`,
            to: `diegopolverelli@hotmail.com, diegpol@yahoo.com`,
            // text: `prueba...`,
            html: `
<h2>Prueba correo simple...!!!</h2>
<p style="color:blue;"><strong>Pruebasssss...!!!</strong></p>
            ` 
        }
    )
}

let respuesta=await enviar()
console.log(respuesta)