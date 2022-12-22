const jwt = require('jsonwebtoken')

const authControllers = require('./auth.controllers')
const jwtSecret = require('../../config').api.jwtSecret
const mailer=require('../utils/mailer')
const config=require('../../config')


const postLogin = (req, res) => {
    const {email, password} = req.body

    if(email && password){
        authControllers.checkUsersCredentials(email, password)
            .then((data) => {
                if(data){
                    const token = jwt.sign({
                        id: data.id,
                        email: data.email,
                        role: data.role
                    }, jwtSecret) 

                    res.status(200).json({
                        message: 'Correct Credentials!',
                        token
                    })
                } else {
                    res.status(401).json({message: 'Invalid Credentials'})
                }
            })
            .catch((err) => {
                res.status(400).json({message: err.message})
            })
    } else {
        res.status(400).json({message: 'Missing Data', fields: {
            email: 'example@example.com',
            password: "string"
        }})
    }
}


const postRecoveryToken=(req,res)=>{
    const {email}=req.body
     if(email){
        authControllers.createRecoveryToken(email)
        .then(data=>{
        if(data){
            mailer.sendMail({
            from:config.api.mail_name,
            to:email,
            subject:'Recuperacion de contraseña',
            html: `<a href='${config.api.host}/api/v1/auth/recovery-password/${data.id}'>${config.api.host}/api/v1/auth/recovery-password/${data.id}</a>`
            })
        }
        res.status(200).json({message: 'Email sended!'})
        })
        .catch(err=>{
        res.status(400).json({message: err.message})
        })
    }
    else{
        res.status(400).json({
            message:'invalid Data',
            fields:{
                email:'example@example.com'
            }
        })
    }
}

const patchPassword=(req,res)=>{
    const id=req.params.id
    const {password}=req.body
    authControllers.changePassword(id,password)
    .then(data=>{
        if(data){
            res.status(200).json({message:'Password updated successfuly'})
        }
        else{
            res.status(400).json({message:'URL expired'})
        }
    })
    .catch(err=>{
        res.status(400).json({message: err.message})
    })


}


module.exports = {
postLogin,
postRecoveryToken,
patchPassword
}


