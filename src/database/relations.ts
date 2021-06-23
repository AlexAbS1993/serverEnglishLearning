import Statistic from "./models/statistic.model";
import User from "./models/user.model";

User.hasOne(Statistic, {
    allowNull: false
})
Statistic.belongsTo(User, {
    allowNull: false
})

const models = {
    Statistic, 
    User
}

export default models