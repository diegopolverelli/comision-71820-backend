import express from 'express';
import cookieParser from "cookie-parser"

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser("CoderCoder123"))
app.use(express.static('./src/public'))

app.get('/',(req,res)=>{

    console.log(req.headers)


    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get("/setcookies", (req, res)=>{

    let data={
        theme: "Dark",
        fontSize: 22,
        name: "Jack"
    }

    res.cookie("cookie001", data, {})
    res.cookie("cookie002conVto", data, {maxAge: 1000 * 5})
    res.cookie("cookie003conVto", data, {expires: new Date(2025, 11, 18)})
    res.cookie("cookie004firmada", data, {signed: true})
    res.cookie("cookie005firmadaConVto", data, {signed: true, maxAge: 1000*30})
    
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"cookies seteadas...!!!"});
})


app.get("/getcookies", (req, res)=>{

    let cookies=req.cookies
    console.log(cookies.cookie001.fontSize)

    let cookiesFirmadas=req.signedCookies

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({cookies, cookiesFirmadas});
})

app.get("/delcookies", (req, res)=>{

    // res.clearCookie("cookie001")
    let nombresCookies=Object.keys(req.cookies)
    nombresCookies.forEach(c=>res.clearCookie(c))

    nombresCookies=Object.keys(req.signedCookies)
    nombresCookies.forEach(c=>res.clearCookie(c))


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"cookies eliminadas"});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
