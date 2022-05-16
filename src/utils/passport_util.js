import { Strategy } from "passport-local"
import passport from "passport"
import bcrypt from "bcrypt"
import {UserModel} from "../models/user_model.js"

passport.use("signup", new Strategy({
    passReqToCallback:true
}, async (req, username, password, done) => {
    try {
        const userExists = await UserModel.findOne({username})
        if (userExists) {
            console.log("Usuario existe");
            return done(null, false)
        }
        const newUser = {
            username,
            password:bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        }
        const user = await UserModel.create(newUser)
        return done(null, user)
    } catch (error) {
        console.error(error)
    }
},))

passport.use("login", new Strategy(async (username, password, done) => {
    try {
        const user = await UserModel.findOne({username})
        if (!user) {
            console.log("Usuario no encontrado!");
            done(null, false)
        }
        const isValid = bcrypt.compareSync(password, user.password)
        if (isValid){
            return done(null, user)
        } else {
            done(null, false)
        }
    } catch (error) {
        console.log(error);
        done(error)
    }

}))


passport.serializeUser((user, done) =>{
    done(null, user._id)
})

passport.deserializeUser((id, done) =>{
    UserModel.findById(id, done)
})

export default passport;