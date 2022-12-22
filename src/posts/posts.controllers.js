

const Posts=require('../models/post.model')
const uuid=require('uuid')
const Users = require('../models/users.models')


const findAllPosts=async()=>{
    const data= await Posts.findAll()
    return data
}

const findPostbyId=async(id)=>{
    const data=await Posts.findOne({
        where:{
        id:id
        },
        include:{
            model:Users,
            attributes:['id','firstName','lastName']
        }
    })
    return data 
}

const createPost=async(obj)=>{
    const data=await Posts.create({
        id:uuid.v4(),
        userId:obj.userId,
        content:obj.content  
    })
   return data
}

const updatePost= async (id,obj)=>{
    const data=await Posts.update(obj,{
        where:{
            id:id
        
        }
    })
    return data[0]
}

const deletePost=async(id)=>{
    const data=await Posts.destroy({
        where:{
            id:id
           
        }
    })
    return data
}



// Posts User by Id
const findPostsUserById=async(id)=>{
    const data =await Posts.findAll({
        where:{
            userId:id
        }
    })
    return data
}


module.exports={
    findAllPosts,
    findPostbyId,
    findPostsUserById,
    createPost,
    updatePost,
    deletePost
   
}