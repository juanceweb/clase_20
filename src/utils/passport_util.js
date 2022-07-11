import { Strategy } from "passport-local"
import passport from "passport"
import bcrypt from "bcrypt"
import ServiceUsuarios from "../services/user_service.js";


//######################################################
//                  INSTANCIA DE USUARIO
//######################################################
export const usuario = new ServiceUsuarios()



passport.use("signup", new Strategy({
    passReqToCallback:true
}, async (req, username, password, done) => {
    try {
        await usuario.open()
        const user_existe = await usuario.model.findOne({username})
        if (user_existe) {
            console.log("Usuario existente");
            // await usuario.exit()
            return done(null, false)
        }
        const new_user = {
            username,
            password:bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        }
        const user = await usuario.model.create(new_user)
        // await usuario.exit()
        return done(null, user)
    } catch (error) {
        console.error(error)
    }
},))

passport.use("login", new Strategy(async (username, password, done) => {
    try {
        await usuario.open()
        const user = await usuario.model.findOne({username})
        // await usuario.exit()
        if (!user) {
            console.log("Usuario no encontrado!");
            return done(null, false)
        }
        const isValid = bcrypt.compareSync(password, user.password)
        if (isValid){
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (error) {
        console.log(error);
    }

}))


passport.serializeUser((user, done) =>{
    done(null, user._id)
})

passport.deserializeUser((id, done) =>{
    usuario.model.findById(id, done)
})

export default passport;