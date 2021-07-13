const {DataTypes} = require('sequelize') 
import sequelize from "../connection";
import { validationType } from "./Types/validation.types";

const Word = sequelize.define("word", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z\s]+$/ig,
            len: [2, 64]
        }
    },
    engDiscription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z\s]+$/ig,
            len: [1, 128]
        }
    },
    ruTranslate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[а-яА-ЯЁё\s]+$/ig,
            len: [1, 64]
        }
    },
    imgSrc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        }
    },
    awareness: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
            max: 3
        },
        defaultValue: 0
    },
    cathegories: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 28]
        }
    }
}, { timestamps: false })


export const wordValidation:validationType = {
    value: {
        len: {
            value: [1, 64],
            message: "У слова должна быть хотя бы одна буква"
        },
        is:{
            value: ["^[a-zA-Z\\s]+$", "ig"],
            type: "regexp",
            message: "Допускаются только английские символы"
        }
    },
    engDiscription: {
        len: {
            value: [1, 128],
            message: "У описания должна быть хотя бы одна буква"
        },
        is: {
            value: ["^[a-zA-Z\\s]+$", "ig"],
            type: "regexp",
            message: "Допускаются только английские символы"
        }
    },
    ruTranslate: {
        len: {
            value: [1, 64],
            message: "У слова должна быть хотя бы одна буква"
        },
        is: {
            value: ["^[а-яА-ЯЁё\\s]+$", "ig"],
            type: "regexp",
            message: "Перевод должен быть на русском языке"
        }
    },
    imgSrc: {
        isUrl: {
            value: ["^https?:\\/\\/\\S+\\.(?:jpg|jpeg|png)$", "ig"],
            type: "regexp",
            message: "Необходима ссылка"
        }
    },
    cathegories: {
        len: {
            value: [1, 28],
            message: "Категория должна содержать от 1 до 28 символов"
        },
    }
}

export default Word