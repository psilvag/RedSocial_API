<p align="center">
  <a href="https://nodejs.org/api/https.html" target="blank"><img src="./assets/node.png" width="500" alt="Node Logo" /></a>
</p>

# Acerca de la API

Esta api permite crear una pequeña ```Red Social``` con usuarios,posts,comentarios en los posts, likes en los comentarios, seguidores y seguidos de un usuario
Tiene implementado una ruta de autenticación  utilizando la estrategia Json Web Token de Passport,roles de usuario user-admin y la recuperacion de contraseña del usuario usando una doble verificacion en el correo. Para ello se utilizó la librería ```NODE Mailer``` con  el servicio ```MailTrap```
Como base de datos se utilizó ```Postgres``` montado en un contenedor de ```Docker``` usando la imagen de Postgres:14.3.

# 🚀 Guia para la ejecución Red Social-API

# Stack usado
* Postgres
* NodeJS
* Express
* Sequelize
* Passport 
* Json Web Token
* Bcrypt
* UUID
* NODE Mailer
* MailTrap


# Red Social - API

1. Clonar el repositorio
2. Instalar la dependencias
```
npm install
```
3. Copiar el archivo .env.template y renombrarlo como .env
4. Llenar las variables de entorno en funcion a la aplicacion
5. Abrir la aplicacion de docker en su computadora para que se reconozcan los comandos docker en la terminal (si no lo tiene instalado, descargue e instale [Docker](https://www.docker.com/products/docker-desktop/)
6. Levantar la base de datos en docker
```
docker compose up -d
```
7. Ejecutar la aplicacion en desarrollo
```
npm run dev
```

# Rutas de la aplicación

## Rutas de Autenticación
Ruta base
```
http://localhost:9000/api/v1/
```

<h2>POST</h2>

```
auth/login
```
```
Ejemplo:
email: example@gmail.com
password: *****password****
```
```
Retorna:
Status 200 : Login correcto
Status 400 : Request invalido, email o password invalidos 
```

<h2>POST</h2>

```
auth/recovery-password
```
```
Required:
email: example@gmail.com
```

```
Retorna:
Status 200 : ID del usuario que solicita la recuperación de password y  un nuevo ID de la solicitud de recuperación
Status 400 : Request invalido, email inexistente
```

<h2>PATCH</h2>

```
auth/recovery-password/:id
```
```
Parametros:
id: - id de la solicitud de la recuperacion
del password (se obtiene en el retorno POST recovery password: Status 200)
password: el nuevo password
```

```
Retorna:
Status 200 : Actualización correcta del password 
Status 400 : Request invalido, el usuario ya actualizo su password
```

## Rutas de Usuarios

<h2>GET</h2>

```
users/
```
```
Retorna:
Status 200 : Todos los usuarios
Status 400 : Request invalido
```

<h2>GET</h2>

```
user/me
```
```
Retorna:
Status 200 : Información de tu perfil 
Status 400 : Request invalido
Status 404 : Usuario no encontrado
```
<h2>GET</h2>

```
users/:id
```
```
Parametros:
id: id del usuario buscado
```
```
Retorna:
Status 200 : La información del usuario por ID
Status 400 : Request invalido
Status 404 : Usuario no encontrado
```

<h2>POST</h2>

```
users/
```

```
Required:
id:type:UUID,
firstName:type:STRING
lastName:type:STRING
email:type:STRING
password:type:STRING
gender:type:STRING
country:type:STRING
birthday:type:DATEONLY
phone:type:STRING
nickName:type:STRING
profileImage:type:STRING
role:type:STRING
status:type:STRING
isVerified:type::BOOLEAN
     
```

```
Required TRUE:

id:type:UUID
firstName:type:STRING
lastName:type:STRING
email:type:STRING
password:type:STRING
gender:type:STRING
birthday:type:DATEONLY
nickName:type:STRING
```

```
Retorna:
Status 201 : Usuario creado correctamente
Status 400 : Request invalido
```

<h2>POST</h2>

```
:id/follow
```
```
Paramtros:
id: id del usuario al que se seguira
```
```
Required:
id: id del usuario al que se seguira

```

```
Retorna:
Status 200 : Ya sigues al usuario
Status 201 : Sigues a este usuario
Status 400 : Request invalido
```

<h2>PATCH</h2>

```
users/me
```

```
Required:

firstName:type:STRING
lastName:type:STRING
email:type:STRING
gender:type:STRING
birthday:type:DATEONLY
nickName:type:STRING
profileImage:type:STRING
phone:type:STRING

```

```
Retorna:
Status 200 : Perfil propio actualizado
Status 400 : Request invalido
Status 404 : Usuario no encontrado
```

<h2>PATCH</h2>

```
users/:id
```

```
Requerimiento Rol: admin
```

```
Required:

firstName:type:STRING
lastName:type:STRING
email:type:STRING
gender:type:STRING
country:type:STRING
birthday:type:DATEONLY
phone:type:STRING
nickName:type:STRING
profileImage:type:STRING
role:type:STRING
status:type:STRING
isVerified:type::BOOLEAN

```

```
Retorna:
Status 200 : Usuario por ID actualizado
Status 400 : Request invalido
Status 404 : Usuario no encontrado
```

<h2>DELETE</h2>

```
users/me
```
```
Retorna:
Status 200 : Perfil eliminado
Status 400 : Request invalido
Status 404 : Usuario no encontrado
```

<h2>DELETE</h2>

```
users/:id
```

```
Requerimiento Rol: admin
```

```
Retorna:
Status 200 : Usuario por ID eliminado 
Status 400 : Request invalido
Status 404 : Usuario no encontrado
```


## Rutas de Publicaciones

<h2>GET</h2>

```
posts/
```

```
Retorna:
Status 200 : Retorna todas las publicaciones
Status 400 : Request invalido
```

<h2>GET</h2>

```
posts/:id
```
```
Parametros:
id: id de la publicación buscada
```
```
Retorna:
Status 200 : La información de la publicación por ID
Status 400 : Request invalido
Status 404 : Publicación no encontrada
```


<h2>GET</h2>

```
posts/:id/likes
```

```
Parametros:
id: id de la publicación buscada
```

```
Retorna:
Status 200 : Los likes de una publicación por ID
Status 400 : Request invalido
Status 404 : Publicación no encontrada
```

<h2>GET</h2>

```
posts/:id/comments
```

```
Parametros:
id: id de la publicación buscada
```

```
Retorna:
Status 200 : Todos los comentarios de la publicación por ID
Status 400 : Request invalido
Status 404 : Publicación no encontrada
```

<h2>POST</h2>

```
posts/
```

```
Required:
id:type:UUID
userID:type:UUID
content:type:TEXT
```

```
Required TRUE:
id:type:UUID
userID:type:UUID
content:type:TEXT
```

```
Retorna:
Status 200 : Crea una publicación
Status 400 : Request invalido
```


<h2>POST</h2>

```
posts/:id/likes
```

```
Parametros:
id: id de la publicación donde se pone like
```

```
Required:
id:type:UUID
userId:type:UUID
postId:type:UUID
```

```
Retorna:
Status 200 : Like creado en la publicación
Status 400 : Request invalido
Status 404 : Publicación no encontrada
```


<h2>POST</h2>

```
posts/:id/comments
```

```
Parametros:
id: id de la publicación donde se pone el comentario
```

```
Required:
id:type:UUID
userId:type:UUID
postId:type:UUID
```

```
Retorna:
Status 200 : Comentario creado en la publicación
Status 400 : Request invalido
Status 404 : Publicación no encontrada
```

<h2>PATCH</h2>

```
posts/:id
```

```
Required:
content:type:TEXT
```

```
Retorna:
Status 200 : Publicación por ID actualizada
Status 400 : Request invalido
Status 404 : Publicación no encontrada
```

<h2>DELETE</h2>

```
posts/:id
```

```
Parametros:
id: id de la publicación a eliminar
```

```
Retorna:
Status 204 : Publicación eliminada 
Status 400 : Request invalido
Status 404 : Publicación no encontrada
```

## Rutas de Seguidos y seguidores

<h2>GET</h2>

```
/followers
```

```
Retorna:
Status 200 : Retorna tus seguidores
Status 400 : Request invalido
```

<h2>GET</h2>

```
/follows
```

```
Retorna:
Status 200 : Retorna usuarios a los que sigues
Status 400 : Request invalido
```




