import Statistic from "./models/statistic.model";
import User from "./models/user.model";
import Word from "./models/word.model"
import userWord from './models/userWordThrough'


User.hasOne(Statistic, {
    allowNull: false
})
Statistic.belongsTo(User, {
    allowNull: false
})
User.belongsToMany(Word, {through: userWord
})
Word.belongsToMany(User, {through: userWord
})
User.hasMany(userWord)
userWord.belongsTo(User)
Word.hasMany(userWord)
userWord.belongsTo(Word);


const models = {
    Statistic, 
    User,
    Word,
    userWord
}

export default models