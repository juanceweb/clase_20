import path from "path"

// SIGN UP

export function getSignup(req, res) {
    res.sendFile(path.resolve() + "/src/views/signup.html")
}

export function postSignup(req, res) {
    const user = req.user;
    console.log(user);
    res.sendFile(path.resolve() + "/src/views/login.html")
}

export function failSignup(req, res){
    console.log('Error en el registro');
    res.render("signup-error",{})
    
}

// LOGIN

export function getLogin(req, res) {
    
    if (req.isAuthenticated()) {
        const user = req.user
        console.log("Usuario logueado!");
        res.render("login-ok", {
            usuario: user.username,
            nombre: user.firstName,
            apellido: user.lastName,
            email: user.email
        })
    } else {
        console.log('Usuario no logueado');
        res.sendFile(path.resolve()+"/src/views/login.html")
    }
}

export function postLogin(req, res) {
    const user = req.user;
    console.log(user);
    res.sendFile(path.resolve()+"/src/views/index.html")
}

export function failLogin(req, res) {
    console.log('Error en el logueo');
    res.render("login-error",{})
}

// LOGOUT

export function logout(req, res) {
    console.log("logout")
    req.logout()
    res.sendFile(path.resolve() + "/src/views/login.html")
}