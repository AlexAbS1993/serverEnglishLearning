import { Injectable } from "@nestjs/common";
import { validationSchema } from "src/database/models/user.model";
import { wordValidation } from "src/database/models/word.model";



@Injectable()
export class ValidateService{
    registrationValidation(){
        return {
            message: "Схема валидации получена",
            schema: validationSchema}
    }
    newWordValidation(){
        return {
            message: "Схема валидации получена",
            schema: wordValidation
        }
    }
}