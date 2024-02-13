const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const passport = require('passport')
const jwtSecret = require('../../config').api.jwtSecret

const { findUserById } = require('../users/users.controllers')

// options: Le indicamos a passport como va a extraer el token jwt de las solicitudes y que clave usara para verificarlo
const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret
}
// passport.use: le decimos  a passport como se va a AUTENTICAR el usuario al acceder a una ruta protegida
passport.use(
    new JwtStrategy(options, (tokenDecoded, done) => {
        findUserById(tokenDecoded.id)
            .then((user) => {
                if(user){
                    done(null, tokenDecoded) //? Caso Exitoso, porque el usuario si existe
                } else {
                    done(null, false) //? Caso fallido, en el que no genera error, pero no existe el usuario
                }
            })
            .catch((err) => {
                done(err, false) //? Caso fallido, en el que si genera un error
            })
    })
)

module.exports = passport
