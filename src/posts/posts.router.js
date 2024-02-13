

const router=require('express').Router()
const postServices=require('./posts.services')
const passportJWT = require('../middlewares/auth.middleware')
const likesServices=require('../likes/likes.services')
const commentsServices=require('../comments/comments.services')

router.route('/')
    .get(postServices.getAllPosts)
    .post(passportJWT.authenticate('jwt',{session:false}),postServices.postNewPost)

router.route('/:id')
    .get(postServices.getPostById)
    .patch(passportJWT.authenticate('jwt',{session:false}),postServices.patchPost)
    .delete(passportJWT.authenticate('jwt',{session:false}),postServices.deletePost)

router.route('/:id/likes')
    .get(likesServices.getAllLikesFromPost)
    .post(passportJWT.authenticate('jwt',{session:false}),likesServices.postLikes)

router.route('/user/:id') // revisar 
    .get(passportJWT.authenticate('jwt',{session:false}),postServices.getPostsUserById)

router.route('/:id/comments')
    .get(passportJWT.authenticate('jwt',{session:false}),commentsServices.getCommentsPost)
    .post(passportJWT.authenticate('jwt',{session:false}),commentsServices.postComment)

    
module.exports=router




