const {DataTypes} = require('sequelize') 
import sequelize  from '../connection'

const userWord = sequelize.define("userWord", {},
{
    timestamps: false
}
)

export default userWord