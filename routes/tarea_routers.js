import express from "express";
const router_tareas = express.Router();
import Tarea from "../models/Tarea.js";
import Usuario from "../models/Usuario.js";
// GET /api/tarea?usuario_id=1 = Listar
router_tareas.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (req.query.usuario_id) where.usuario_id = req.query.usuario_id;
    const tareas = await Tarea.findAll({ where });
    res.json(tareas);
  } catch (err) {
    next(err);
  }
});
// GET /api/tarea/:id = Obtener una
router_tareas.get("/:id", async (req, res, next) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(tarea);
  } catch (err) {
    next(err);
  }
});
// POST /api/tarea = Crear
router_tareas.post("/", async (req, res, next) => {
  const { titulo, usuario_id } = req.body;
  if (!titulo || !usuario_id) {
    return res
      .status(400)
      .json({ error: "Título y usuario_id son obligatorios" });
  }
  try {
    // Validación de integridad referencial: ¿existe el usuario?
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario)
      return res.status(404).json({ error: "El usuario no existe" });
    const nueva = await Tarea.create({ titulo, usuario_id });
    res.status(201).json(nueva);
  } catch (err) {
    next(err);
  }
});
// PUT /api/tarea/:id = Actualizar
router_tareas.put("/:id", async (req, res, next) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

    await tarea.update(req.body); // Sequelize solo actualiza los campos enviados
    res.json(tarea);
  } catch (err) {
    next(err);
  }
});
// DELETE /api/tarea/:id = Eliminar
router_tareas.delete("/:id", async (req, res, next) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    await tarea.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
export default router_tareas;
