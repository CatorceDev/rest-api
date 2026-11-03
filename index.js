import express from "express";
import db from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import { Usuario, Tarea } from "./models/Asociaciones.js";
import router_usuarios from "./routes/usuario_routes.js";
import router_tareas from "./routes/tarea_routers.js";
const __dirname = path.resolve();
dotenv.config({ path: ".env" });
//Crear la aplicación
const app = express();

// Middleware para parsear JSON
app.use(express.json());
//routing
app.use("/api/usuario", router_usuarios);
app.use("/api/tarea", router_tareas);
app.get("/", (req, res) => {
  res.json({
    mensaje: "API REST con Sequelize Interfaz",
    endpoints: {
      usuarios: "/api/usuario",
      tareas: "/api/tarea",
    },
  });
});
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});
//definiendo el puerto
const port = 2900;
(async () => {
  try {
    await db.authenticate();
    console.log("Conexión a la base de datos establecida.");
    await db.sync({ alter: true }); // crea/actualiza tablas
    console.log("Modelos sincronizados.");
    app.listen(port, () => {
      console.log(`Esperando peticiones en el puerto ${port}`);
    });
  } catch (err) {
    console.error("Error al iniciar:", err);
  }
})();
