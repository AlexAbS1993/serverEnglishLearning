const {DataTypes} = require('sequelize') 
import sequelize  from '../connection'


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
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user"
    }
}, {
    timestamps: false
})

export const validationSchema = {
    login: {
        len: {value: [4, 16],
            message: "Длина логина должна быть от 4 до 16 символов"
        },
        is: {
            value: ["^[a-zA-Z]+$", "ig"],
            type: "regexp",
            message: "Логин должен состоять только из строчных и прописных английских символов"
        }
    },
    password: {
        len: {
            value: [4, 16],
            message: "Длина пароля должна быть от 4 до 16 символов"
        }
        
    }
}

export default User