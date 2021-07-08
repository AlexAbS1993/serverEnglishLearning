import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ValidateService } from './validate.service';


@Controller("validate")
export class ValidateController{
    constructor(private readonly validateService: ValidateService) {}
    @Get("registration")
    registrationValid(){
        return this.validateService.registrationValidation()
    }
    @Get("newWord")
    newWord(){
        return this.validateService.newWordValidation()
    }
}