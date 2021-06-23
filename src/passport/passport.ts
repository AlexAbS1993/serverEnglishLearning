const config = require("config")
import models from '../database/relations'
const {User} = models

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts:any = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get("secretkey");

export const passportUseFunction = (passport) => {
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    const user = await User.findOne({where: {id: jwt_payload.id}})
    if (!user){
        return done(null, false);
    }
    else {
        return done(null, user);
    }
}))};