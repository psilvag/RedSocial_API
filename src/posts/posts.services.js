
const postsControllers=require('./posts.controllers')

const getAllPosts=(req,res)=>{
    postsControllers.findAllPosts()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
}

const getPostById=(req,res)=>{
    const id=req.params.id
    postsControllers.findPostbyId(id)
    .then(data=>{
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(404).json({
            message:`Post whit ${id} not found`
        }) 
        }
      
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
}

const postNewPost=(req,res)=>{
    const {content}=req.body
    const userId=req.user.id
    postsControllers.createPost({content,userId})
    .then(data=>{
        res.status(201).json(data)
              
        }) 
    .catch(err=>{
        res.status(400).json({
            message:err.message,
            fields:{
                content:'text'
            }
        })
    })
}

const patchPost=(req,res)=>{
    const id=req.params.id
    const {content}=req.body
    postsControllers.patchPost(id,{content})
    .then(data=>{
        if(data){
            res.status(200).json({message:`Post ${id} updated succesfuly`})
        }
        else{
            res.status(400).json({
            message:`Invalid ID`
        }) 
        }
      
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
}

const deletePost=(req,res)=>{
    const id=req.params.id
     postsControllers.deletePost(id)
    .then(data=>{
        if(data){
            res.status(204).json()
               
        }
        else{
            res.status(400).json({
            message:`Invalid ID`
        }) 
        }
      
    })
    .catch(err=>{
        res.status(400).json({
            message:err.message
        })
    })
}


// Posts User by Id
const getPostsUserById=(req,res)=>{
    const id=req.params.id
    postsControllers.findPostsUserById(id)
   .then(data=>{
       if(data){
           res.status(200).json(data)
              
       }
       else{
           res.status(404).json({
           message:`Invalid ID`
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
    getAllPosts,
    getPostById,
    getPostsUserById,
    postNewPost,
    patchPost,
    deletePost
    
}