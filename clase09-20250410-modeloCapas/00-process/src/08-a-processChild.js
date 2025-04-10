import express from 'express';
import {fork, execFile, exec} from "child_process"

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let visitas=0
app.get('/',(req,res)=>{
    let {nombre}=req.query

    visitas++

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({visitas, nombre:nombre?nombre:"no recibi datos"});
})

app.get('/op1',(req,res)=>{

    let numero1=Math.floor(Math.random()*(10)+1)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)
    let numero2=Math.floor(Math.random()*(10)+1)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload: `${numero1} + ${numero2} = ${numero1 + numero2}`});
})

// const calculo=()=>{
//     console.log("Comienza el calculo...")
//     console.time("Tiempo de proceso: ")
//     let resultado=0

//     for(let i=0; i<800_000_000; i++){
//         resultado+=Math.floor(Math.random()*(10)+1)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)
//     }

//     console.timeEnd("Tiempo de proceso: ")

//     return resultado
// }

let contador=0
app.get('/op2',(req,res)=>{
    
    contador++
    // let resultado=calculo()
    let child=fork("./src/08-b-calculo.js")
    child.send(`Soy el proceso principal con pid ${process.pid} y necesito que te ejecutes!`)

    child.on("message", mensaje=>{
        if(mensaje.type=="resultado"){
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload: `${mensaje.resultado} - visitas a la ruta: ${contador}`});
        }
    })

})

app.get("/calc", (req, res)=>{
    execFile("calc.exe", error=>{
        if(error){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Calc ejecutando"});
    })
})

app.get("/dir", (req, res)=>{
    exec("dir /s", (error, respuesta)=>{
        if(error){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error`})
        }

        res.setHeader('Content-Type','text/plain');
        return res.status(200).send(respuesta);
    })
})





const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT} - pid: ${process.pid}`);
});
