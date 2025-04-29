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
        subject: `Prueba mail con imagenes incrustadas`,
        from:`Diego diegopolverelli@gmail.com`,
        to: `diegopolverelli@hotmail.com`,
        html: `<h2>Prueba de correo con imagenes incrustadas</h2>
        
<img src="cid:a01" width=300>
<h4>Fotos...!!!</h4>
<img src="cid:a02" width=300>
<img src="cid:a03" width=300>
        
        `, 
        attachments: [
            {
                path: `./images/diego10.jpg`,
                filename: `diego10.jpg`,
                cid: "a01"
            },
            {
                path: `./images/lio.jpg`,
                filename: `lionel01.jpg`,
                cid: "a02"
            },
            {
                path: `./images/lio2.jpg`,
                filename: `messi.jpg`,
                cid: "a03"
            },
        ]
    })
}

let respuesta=await enviar()
console.log(respuesta)