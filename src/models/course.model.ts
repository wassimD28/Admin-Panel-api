import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.config";

class Course extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
  },
  {
    tableName: 'courses',
    sequelize, // passing the `sequelize` instance is required
  }
);

export default Course;