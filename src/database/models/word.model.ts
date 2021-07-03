const {DataTypes} = require('sequelize') 
import sequelize from "../connection";

const Word = sequelize.define("word", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    value: {
        type: DataTypes.STRING,
        validation: {
            is: /^[a-zA-Z]+$/ig,
            len: [1, 64]
        }
    },
    engDiscription: {
        type: DataTypes.STRING,
        validation: {
            is: /^[a-zA-Z]+$/ig,
            len: [1, 128]
        }
    },
    ruTranslate: {
        type: DataTypes.STRING,
        validation: {
            is: /^[а-яА-ЯЁё]+$/ig,
            len: [1, 64]
        }
    },
    imgSrc: {
        type: DataTypes.STRING,
        allowNull: false,
        validation: {
            isUrl: true,
        }
    }
}, { timestamps: false })


export const wordValidation = {
    value: {
        len: {
            value: [1, 64],
            message: "У слова должна быть хотя бы одна буква"
        },
        is:{
            value: /^[a-zA-Z]+$/ig,
            message: "Допускаются только английские символы"
        }
    },
    engDiscription: {
        len: {
            value: [1, 128],
            message: "У описания должна быть хотя бы одна буква"
        },
        is: {
            value: /^[a-zA-Z]+$/ig,
            message: "Допускаются только английские символы"
        }
    },
    ruTranslate: {
        len: {
            value: [1, 64],
            message: "У слова должна быть хотя бы одна буква"
        },
        is: {
            value: /^[а-яА-ЯЁё]+$/ig,
            message: "Перевод должен быть на русском языке"
        }
    },
    imgSrc: {
        isUrl: {
            value: true,
            message: "Необходима ссылка"
        }
    }
}

export default Word