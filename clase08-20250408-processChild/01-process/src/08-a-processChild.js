import express from 'express';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let visitas=0
app.get('/',(req,res)=>{

    visitas++

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({visitas});
})

app.get('/op1',(req,res)=>{

    let numero1=Math.floor(Math.random()*(10)+1)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)
    let numero2=Math.floor(Math.random()*(10)+1)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload: `${numero1} + ${numero2} = ${numero1 + numero2}`});
})

const calculo=()=>{
    console.log("Comienza el calculo...")
    console.time("Tiempo de proceso: ")
    let resultado=0

    for(let i=0; i<10; i++){
        resultado+=Math.floor(Math.random()*(10)+1)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)
    }

    console.timeEnd("Tiempo de proceso: ")

    return resultado
}

let contador=0
app.get('/op2',(req,res)=>{

    contador++
    let resultado=calculo()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload: `${resultado} - visitas a la ruta: ${contador}`});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
