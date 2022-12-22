 const {DataTypes}=require('sequelize')
 const db=require('../utils/database')
 const Posts=require('./post.model')
 const Users=require('./users.models')
 
 const Comments=db.define('comments',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true
    },
    userId:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            key:'id',
            model:Users
        }
    },
    postId:{
            type:DataTypes.UUID,
            allowNull:false,
            references:{
                key:'id',
                model:Posts
            }
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false

    }
})

module.exports=Comments