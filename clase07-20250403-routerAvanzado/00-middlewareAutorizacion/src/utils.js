import {fileURLToPath} from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken'
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const SECRET="CoderCoder123"
export default __dirname;

export const passportCall=estrategia=>{
    return function (req, res, next) {
        passport.authenticate(estrategia, function (err, user, info, status) {
            if (err) { return next(err) }   // desde passport.config hago un return done(error)
            if (!user) {
                // return res.redirect('/signin') 
                res.setHeader('Content-Type','application/json'); // desde passport.config hago un return done(null, false)
                return res.status(400).json({error:`${info.message?info.message:info.toString()}`})
            }
            req.user=user // desde passport.config hago un return done(null, usuario)
            // res.redirect('/account');
            return next()
        })(req, res, next);
    }
}



