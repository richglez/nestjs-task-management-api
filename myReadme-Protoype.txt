POST /auth/register  →  bcrypt hashea el password  →  guarda en DB
POST /auth/login     →  bcrypt compara passwords   →  genera JWT
GET  /tasks          →  valida JWT                 →  devuelve datos




✅ POST /auth/register — público
✅ POST /auth/login — público, devuelve JWT
✅ GET/POST/PATCH/DELETE /tasks — protegidos con JWT
✅ GET/POST/PATCH/DELETE /users — protegidos con JWT
✅ Soft delete en tasks y users
✅ Password hasheado con bcrypt
✅ JWT Guard con Passport

