import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ValidateController } from './validate.controller';
import { ValidateService } from './validate.service';
const passport = require("passport")

@Module({
    imports: [],
    controllers: [ValidateController],
    providers: [ValidateService],
})


export class ValidateModule implements NestModule{
    constructor(private ValidateService: ValidateService){}
    configure(){}
}