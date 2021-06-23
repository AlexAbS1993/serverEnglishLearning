import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
const passport = require("passport")

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
})


export class UserModule implements NestModule{
    constructor(private UserService: UserService){}
    configure(consumer: MiddlewareConsumer){
        consumer
        .apply(passport.authenticate("jwt", {session: false}))
        .exclude("auth/getUsers", "auth/registration", "auth/loginIn")
        .forRoutes("auth")
    }
}