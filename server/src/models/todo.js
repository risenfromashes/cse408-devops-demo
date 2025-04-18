import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'todos',
  }
);

export default Todo;