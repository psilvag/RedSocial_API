Url base: http://localhost:9000/api/v1

/auth
/login -> Login con las credenciales del usuario para autenticar


/posts

/me -> Mis propias publicaciones
/user/:id -> Publicaciones de usuarios en particular
/:id -> Una publicación en especifico
/:id/comments -> Los comentarios de una publicación en especifico
/:id/likes -> Los likes de una publicación en especifico


/users
/me -> Mi informacion de usuario
/:id -> Un usuario en especifico
/:id/follow->Seguir a un usuario


/follows
/followers


Controllers Posts
 findAllPosts
 findPostById
 createPost
 updatePost
 removePost
 
Services Posts
 getAllPosts
 getPostById
 postNewPost
 patchPost
 deletePost