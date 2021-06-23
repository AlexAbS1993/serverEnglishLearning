const {Sequelize} = require("sequelize") 

const sequelize =  new Sequelize("englishlearn", "postgres", "04051993", {
    host: "localhost",
    dialect: "postgres"
})

export default sequelize