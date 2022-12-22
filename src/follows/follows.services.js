const followControllers = require('./follows.controllers')

const postFollower = (req, res) => {
    const followerId = req.user.id 
    const followingId = req.params.id 

    followControllers.followUser(followerId, followingId)
        .then(data => {
            if(data){
                res.status(201).json({
                    data,
                    message:'You are following this user'
                })
                  
            }
            else{
                res.status(200).json({
                message:`You dont following this user anymore`
            }) 
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const getMyFollowers = (req, res) => {
    const userId = req.user.id
    followControllers.findMyFollowers(userId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const getMyFollowings = (req, res) => {
    const userId = req.user.id 
    followControllers.findMyFollowings(userId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

module.exports = {
    postFollower,
    getMyFollowers,
    getMyFollowings
}