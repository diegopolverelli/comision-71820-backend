import express from 'express';
const PORT=3000;

const app=express();

app.use(express.json());   
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/saludo',(req,res)=>{
    // req.query

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Buen día...!!!"});
})

app.get('/nombre',(req,res)=>{
    // req.query

    res.status(200).send("Juan")
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

