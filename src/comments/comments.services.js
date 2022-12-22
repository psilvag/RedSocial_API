

const commentsControllers=require('./comments.controllers')

 
const postComment=(req,res)=>{
    const userId=req.user.id
    const postId=req.params.id
    const {content}=req.body
    commentsControllers.createCommentInPost({userId,postId,content})
    .then(data=>{
        if(data){
            res.status(201).json(data)
        }
        else{
            res.status(404).json({
                message:'Post not found, invalid ID'
            })
        }
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
 }
 const getCommentsPost=(req,res)=>{
  
    const postId=req.params.id
    commentsControllers.findAllCommentsInPost(postId)
    .then(data=>{
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(404).json({
                message:'Post not found, invalid ID'
            })
        }
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
 }

 module.exports={
    getCommentsPost,
    postComment
  
 }