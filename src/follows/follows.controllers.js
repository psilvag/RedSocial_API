
const Follows=require('../models/follows.model')
const uuid=require('uuid')
const Users = require('../models/users.models')


const followUser=async(follower,following)=>{

    const validateFollow=await Follows.findOne({
        where:{
            userId:follower,
            userId2:following
        }
          
    })
    if(validateFollow){
        const value=await Follows.destroy({
            where:{
                id:validateFollow.id
            }
        })
        if(value){return null}
        
    }

    const data=await Follows.create({
        id:uuid.v4(),
        userId:follower,
        userId2:following
    })
    return data
}

const findMyFollowers=async(userId)=>{
    const data=await Follows.findAll({
        where:{
            userId2:userId
        },
        include:{
            model:Users,
            attributes:['id','firstName','lastName'],
            as:"followers"
        }
    })
    return data.map(item=>item.followers)
}

const findMyFollowings=async(userId)=>{

    const data=await Follows.findAll({
        where:{
            userId:userId
        },
        include:{
            model:Users,
            attributes:['id','firstName','lastName'],
            as:"following"
        }
    })
               
    return data.map(item=>item.following)
    
  
}

module.exports={
    followUser,
    findMyFollowers,
    findMyFollowings
}