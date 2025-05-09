import express from 'express';
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import passport from 'passport';
import { inicilizarPassport } from './config/passport.config.js';
import { router as productosRouter } from './routes/productosRouter.js';
import fs from 'fs'
import { passportCall, SECRET } from './utils.js';
import { auth } from './middleware/auth.js';
import { autorizacion } from './middleware/autorizacion.js';
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// paso 2
inicilizarPassport()
app.use(passport.initialize())
// app.use(passport.session)   // solo si uso sessions
app.use(express.static("./src/public"))

app.use("/api/productos", productosRouter)

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

let usuarios = []
if (fs.existsSync('./src/usuarios.json')) {
    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf-8'))
}

app.post('/registro', (req, res) => {
    let { nombre, email, password } = req.body
    if (!nombre || !email || !password) return res.status(400).send('Ingrese todos los datos')

    let usuario = usuarios.find(u => u.email === email)
    if (usuario) return res.status(400).send(`El usuario ${email} ya existe en la DB`)

    let id = 1
    if (usuarios.length > 0) id = usuarios[usuarios.length - 1].id + 1

    usuario = {
        id, nombre, email, password
    }

    usuarios.push(usuario)

    fs.writeFileSync('./src/usuarios.json', JSON.stringify(usuarios, null, 5))

    res.json({
        usuarioCreado: usuario
    })
})

// app.post('/login', (req, res) => {
//     let { email, password } = req.body
//     if (!email || !password) return res.status(400).send('Ingrese email y password')

//     usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))

//     let usuario = usuarios.find(u => u.email === email && u.password === password)
//     if (!usuario) return res.status(400).send(`Error credenciales`)

//     usuario = { ...usuario }
//     delete usuario.password

//     let token = jwt.sign(usuario, SECRET, { expiresIn: "1h" })

//     res.cookie("token", token, { httpOnly: true })
//     return res.status(200).json({
//         usuarioLogueado: usuario,
//         // token
//     })

// })

app.post('/login', passportCall("login"), (req, res) => {

    let usuario = { ...req.user }
    delete usuario.password

    let token = jwt.sign(usuario, SECRET, { expiresIn: "1h" })

    res.cookie("token", token, { httpOnly: true })
    return res.status(200).json({
        usuarioLogueado: usuario,
        // token
    })

})

app.get("/logout", (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    res.clearCookie("token")
    return res.status(200).json({ payload: "Logout exitoso!" });
})


const mid01=(req, res, next)=>{

    console.log(`Mid pruebas...!!!`)
    next()
}

// paso 3
// app.get('/usuario', auth, (req,res)=>{
// app.get('/usuario', passport.authenticate("current", { session: false }), (req, res) => {
app.get('/usuario', mid01, passportCall("current"), autorizacion("user"), (req, res) => {

    // si passport.authenticate sale OK deja un req.user con los datos del usuario

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        mensaje: 'Perfil usuario ' + req.user.nombre,
    });
});

app.get('/usuario2', passportCall("current"), autorizacion("public"), (req, res) => {

    // si passport.authenticate sale OK deja un req.user con los datos del usuario

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        mensaje: 'Perfil usuario ' + req.user.nombre,
    });
});

// app.get('/protected', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info, status) {
//         if (err) { return next(err) }
//         if (!user) { return res.redirect('/signin') }
//         res.redirect('/account');
//     })(req, res, next);
// });

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
