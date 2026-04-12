POST /auth/register  →  bcrypt hashea el password  →  guarda en DB
POST /auth/login     →  bcrypt compara passwords   →  genera JWT
GET  /tasks          →  valida JWT                 →  devuelve datos

falta auth

falta readonly para que el admin de la base de datos no altere datos y mantener la seguirdad y la consistencia de los datos, que el usuario nadamas sea el que tenga el control de sus datos
