import { WordService } from './words.service';
import { WordController } from './words.controller';
import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
const passport = require("passport")

@Module({
    imports: [],
    controllers: [WordController],
    providers: [WordService],
})


export class WordsModule implements NestModule{
    constructor(private WordService: WordService){}
    configure(consumer: MiddlewareConsumer){
        consumer
        .apply(passport.authenticate("jwt", {session: false}))
        // .exclude("auth/getUsers", "auth/registration", "auth/isLogin")
        .forRoutes("words")
    }
}