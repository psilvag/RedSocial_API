const Comments=require('../models/comments.model')
const Users=require('../models/users.models')
const uuid=require('uuid')


const createCommentInPost=async(obj)=>{
    const data= await Comments.create({
        id:uuid.v4(),
        userId:obj.userId,
        postId:obj.postId,
        content:obj.content
      
    })
    return data
}

const findAllCommentsInPost=async(postId)=>{
    const data=await Comments.findAll({
        where:{
            postId:postId
        }
    })
    return data
}

module.exports={
    createCommentInPost,
    findAllCommentsInPost
}