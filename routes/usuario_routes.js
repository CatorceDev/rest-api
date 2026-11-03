import express from "express";
import Usuario from "../models/Usuario.js";
import Tarea from "../models/Tarea.js";
const router_usuarios = express.Router();
// GET /api/usuario = Listar todos
router_usuarios.get("/", async (req, res, next) => {
  try {
    const usuario = await Usuario.findAll();
    res.json(usuario);
  } catch (err) {
    next(err);
  }
});
// GET /api/usuario/:id = Obtener uno
router_usuarios.get("/:id", async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (err) {
    next(err);
  }
});
// GET /api/usuario/:id/tarea = Sub-recurso: tareas del usuario
router_usuarios.get("/:id/tarea", async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: Tarea,
      attributes: ["id", "nombre", "email"], // JOIN automático gracias a la asociación
    });
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario.Tareas); // Sequelize añade la propiedad con el nombre del modelo asociado
  } catch (err) {
    next(err);
  }
});
// POST /api/usuario = Crear
router_usuarios.post("/", async (req, res, next) => {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: "Nombre y email son obligatorios" });
  }
  try {
    const nuevo = await Usuario.create({ nombre, email });
    res.status(201).json(nuevo);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "El email ya existe" });
    }
    next(err);
  }
});
// PUT /api/usuario/:id = Actualizar
router_usuarios.put("/:id", async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    await usuario.update(req.body);
    res.json(usuario);
  } catch (err) {
    next(err);
  }
});
// DELETE /api/usuario/:id = Eliminar,las tareas se borran en cascada
router_usuarios.delete("/:id", async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    await usuario.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
export default router_usuarios;
