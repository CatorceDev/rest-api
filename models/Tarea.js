import { DataTypes } from "sequelize";
import db from "../config/db.js";
const Tarea = db.define(
  "Tarea",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "tarea",
    timestamps: false,
  },
);
export default Tarea;
