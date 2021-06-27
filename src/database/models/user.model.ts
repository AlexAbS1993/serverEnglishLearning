const {DataTypes} = require('sequelize') 
import sequelize from '../connection'

const User = sequelize.define("users", {
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 16],
            is: /^[a-zA-Z]+$/ig
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 16],
        }
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false
})

export default User