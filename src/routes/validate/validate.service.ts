import { Injectable } from "@nestjs/common";
import { validationSchema } from "src/database/models/user.model";



@Injectable()
export class ValidateService{
    registrationValidation(){
        return {
            message: "Схема валидации получена",
            schema: validationSchema}
    }
}