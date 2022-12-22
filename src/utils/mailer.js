
const nodemailer=require('nodemailer')
const config=require('../../config')

const transporter=nodemailer.createTransport({
   host:"smtp.gmail.com",
   port:465,
   secure:true,
   auth:{
    user:config.api.mail_name,
    pass:config.api.mail_pass
   }
})

module.exports=transporter