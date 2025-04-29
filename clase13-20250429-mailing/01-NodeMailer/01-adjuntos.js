import nodemailer from "nodemailer"
const transporter=nodemailer.createTransport({
    service: "gmail",
    // host: "miempresa.com.ar/email",
    port: 587,
    auth: {
        user: "diegopolverelli@gmail.com",
        pass: "vsvz kmid hhfz ujml"
    }
})

const enviar=()=>{
    return transporter.sendMail({
        subject: `Prueba mail con adjuntos`,
        from:`Diego diegopolverelli@gmail.com`,
        to: `diegopolverelli@hotmail.com`,
        html: `Prueba de correo con adjuntos`, 
        attachments: [
            {
                path: `./images/diego10.jpg`,
                filename: `diego10.jpg`
            },
            {
                path: `./images/lio.jpg`,
                filename: `lionel01.jpg`
            },
            {
                path: `./images/lio2.jpg`,
                filename: `messi.jpg`
            },
        ]
    })
}

let respuesta=await enviar()
console.log(respuesta)