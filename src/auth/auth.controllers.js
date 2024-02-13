const { findUserByEmail,updateUser } = require('../users/users.controllers')
const { comparePassword, hashPassword } = require('../utils/crypto')
const RecoveryPassword=require('../models/recoveryPasswords.models')
const uuid=require('uuid')


// LOGIN 
const checkUsersCredentials = async (email, password) => {
    try {
        const user = await findUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password) // password en texto plano y el password hasheado
        if(verifyPassword){
            return user
        } 
        return null
    
    } catch (error) {
        return error
    }
}
// RECOVERY PASSWORD
const createRecoveryToken= async(email)=>{
    try{
        const user=await findUserByEmail(email)
        const data=await RecoveryPassword.create({
            id:uuid.v4(),
            userId:user.id  
        })
        return data
    }
    catch(error){
        return null
    }
}
// CHANGE PASSWORD
const changePassword=async(idRecoveryPassword,newPassword)=>{
      const recoveryData=await RecoveryPassword.findOne({
        where:{
            id:idRecoveryPassword,
            used:false
        }
      })
      if(recoveryData){
        await RecoveryPassword.update(
            {
                used:true
            },
            {
            where:{
                id:idRecoveryPassword
            }
        })

        const data=await updateUser(recoveryData.userId,
            {
            password:hashPassword(newPassword)
            })
        return data
        }
        else{
        return false
      }
      
}




module.exports = {
checkUsersCredentials,
createRecoveryToken,
changePassword
}
