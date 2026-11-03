# 🚀 REST API de usuarios y tareas

API REST creada con **Node.js**, **Express**, **Sequelize** y **MariaDB**. Permite administrar usuarios y sus tareas.

## 📋 Requisitos

- 🟢 Node.js y npm
- 🐬 MariaDB en ejecución
- 🗄️ Una base de datos MariaDB creada

## ⚙️ Instalación y configuración

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env` en la raíz del proyecto con los datos de conexión:

   ```env
   BD_NOMBRE=nombre_de_la_base
   BD_USUARIO=usuario_de_mariadb
   BD_CLAVE=contraseña
   BD_DIALEC=mariadb
   BD_HOST=localhost
   BD_PORT=3306
   ```

3. Inicia el servidor en modo desarrollo:

   ```bash
   npm run server
   ```

   La API estará disponible en `http://localhost:2900`. Al arrancar, verifica la conexión y sincroniza los modelos con la base de datos. 🔌

## 🌐 Endpoints

Todas las respuestas usan JSON, excepto las operaciones de eliminación, que responden con `204 No Content`.

### 👤 Usuarios — `/api/usuario`

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/usuario` | Lista todos los usuarios |
| `GET` | `/api/usuario/:id` | Obtiene un usuario |
| `GET` | `/api/usuario/:id/tarea` | Lista las tareas de un usuario |
| `POST` | `/api/usuario` | Crea un usuario |
| `PUT` | `/api/usuario/:id` | Actualiza un usuario |
| `DELETE` | `/api/usuario/:id` | Elimina un usuario y sus tareas |

Para crear un usuario, envía `nombre` y `email`:

```json
{
  "nombre": "Ana",
  "email": "ana@example.com"
}
```

### ✅ Tareas — `/api/tarea`

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/tarea` | Lista todas las tareas |
| `GET` | `/api/tarea?usuario_id=1` | Filtra tareas por usuario |
| `GET` | `/api/tarea/:id` | Obtiene una tarea |
| `POST` | `/api/tarea` | Crea una tarea |
| `PUT` | `/api/tarea/:id` | Actualiza una tarea |
| `DELETE` | `/api/tarea/:id` | Elimina una tarea |

Para crear una tarea, envía `titulo` y `usuario_id`:

```json
{
  "titulo": "Preparar el proyecto",
  "usuario_id": 1
}
```

Los campos de una tarea son `id`, `titulo`, `completada` y `usuario_id`. `completada` inicia en `false` si no se proporciona.

## 📬 Ejemplos con curl

```bash
# Consultar usuarios
curl http://localhost:2900/api/usuario

# Crear un usuario
curl -X POST http://localhost:2900/api/usuario \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana","email":"ana@example.com"}'

# Consultar tareas de un usuario
curl "http://localhost:2900/api/tarea?usuario_id=1"
```

## ⚠️ Respuestas de error

- `400 Bad Request`: faltan campos requeridos.
- `404 Not Found`: el usuario, la tarea o la ruta no existe.
- `409 Conflict`: el email ya está registrado.
- `500 Internal Server Error`: ocurrió un error interno.

## 🧪 Pruebas

El proyecto todavía no tiene pruebas automatizadas configuradas. 🛠️
