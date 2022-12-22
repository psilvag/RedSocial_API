

const likesControllers=require('./likes.contollers')


const getAllLikesFromPost=(req,res)=>{
    const id=req.params.id
    likesControllers.findAllLikesFromPost(id)
    .then(data=>{
        if(data){
            res.status(200).json({
                count:data.length,
                users:data
            })
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

const postLikes=(req,res)=>{
    const postId=req.params.id
    const userId=req.user.id
    likesControllers.createLike({userId,postId})
    .then(data=>{
        if(data){
            res.status(201).json({
                data,
                message:'You like this post'
            })
             
            
        }
        else {
            res.status(200).json({
            message:`You dont like this post anymore`
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
    getAllLikesFromPost,
    postLikes
}