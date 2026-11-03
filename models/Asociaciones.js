import Usuario from "./Usuario.js";
import Tarea from "./Tarea.js";
Usuario.hasMany(Tarea, {
  foreignKey: "usuario_id",
  onDelete: "CASCADE",
});
Tarea.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});
export { Usuario, Tarea };
