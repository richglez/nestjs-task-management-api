POST /auth/register  →  bcrypt hashea el password  →  guarda en DB
POST /auth/login     →  bcrypt compara passwords   →  genera JWT
GET  /tasks          →  valida JWT                 →  devuelve datos

falta auth

falta readonly para que el admin de la base de datos no altere datos y mantener la seguirdad y la consistencia de los datos, que el usuario nadamas sea el que tenga el control de sus datos


✅ POST /auth/register — público
✅ POST /auth/login — público, devuelve JWT
✅ GET/POST/PATCH/DELETE /tasks — protegidos con JWT
✅ GET/POST/PATCH/DELETE /users — protegidos con JWT
✅ Soft delete en tasks y users
✅ Password hasheado con bcrypt
✅ JWT Guard con Passport


¿Hacia dónde seguimos? Las opciones naturales serían:

Roles — que solo ADMIN pueda acceder a ciertos endpoints
Swagger — documentar la API automáticamente
Validation pipe global — para que los DTOs validen en toda la app
Dockerfile — containerizar el API
Record<string, string>
hashear la password actualizada
