export const hardsync = true

const {Sequelize} = require("sequelize") 

 const sequelize = (() => {
     if (hardsync){
         return (() => {
            return new Sequelize("englishlearntest", "postgres", "04051993", {
            host: "localhost",
            dialect: "postgres"
        })})()
     }
    else {
        return (() => {
            return new Sequelize("englishlearn", "postgres", "04051993", {
                host: "localhost",
                dialect: "postgres"
            })
        })()
    }
 })()

export default sequelize