import { DataTypes } from "sequelize";
import db from "../config/db.js";
const Usuario = db.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
  },
  {
    tableName: "usuario",
    timestamps: false, // para mantener la simplicidad del ejemplo anterior
  },
);
export default Usuario;
