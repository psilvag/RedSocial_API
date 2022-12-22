
const RecoveryPasswords = require('./recoveryPasswords.models')
const Posts=require('./post.model')
const Users=require('./users.models')
const Comments=require('./comments.model')
const Likes=require('./likes.model')
const Follows=require('../models/follows.model')

const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    Users.hasMany(Posts)
    Posts.belongsTo(Users)

    Users.hasMany(Likes)
    Likes.belongsTo(Users)

    Posts.hasMany(Likes)
    Likes.belongsTo(Posts)

    Posts.hasMany(Comments)
    Comments.belongsTo(Posts)
    
    // Users-followings
    Users.hasMany(Follows)
    Follows.belongsTo(Users,{
        as: "following",
        foreignKey:"userId2"
    })

     // Users-followers
     Users.hasMany(Follows)
     Follows.belongsTo(Users,{
         as: "followers",
         foreignKey:"userId"
     })
 

}

module.exports = initModels