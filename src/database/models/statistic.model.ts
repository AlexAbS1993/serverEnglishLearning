import { DataTypes } from "sequelize";
import sequelize from "../connection";

const Statistic = sequelize.define("statistic", {
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    timestamps: false
})

export default Statistic