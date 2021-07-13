import { Body, Controller, Get, Post, Res, Req, Delete, Param, Query } from "@nestjs/common";
import { wordBodyObject } from "./Types/words.service.types";
import { WordService } from "./words.service";


@Controller("words")
export class WordController{
    constructor(private readonly WordService: WordService){}
    @Post("addAtDict")
    addWordAtDictionary(@Body() body: wordBodyObject, @Req() request){
        return this.WordService.AddNewWordToDictionary(body, request.user)
    }
    @Get("getMyWords")
    getWords(@Req() request){
        return this.WordService.getUsersWords(request.user)
    }
    @Get("oneWord")
    getOneWord(@Body("id") id: number){
        return this.WordService.getOneWord(id)
    }
    @Delete('del/:id')
    deleteWord(@Param('id') id: string, @Req() request: any){
        return this.WordService.deleteWord(Number(id), request.user.id)
    }
    @Get("count/:count")
    getCountOfWords(@Param("count") count: string, @Req() request: any){
        return this.WordService.getCountWords(Number(count), request.user.id)
    }
    @Get("count")
    getGeneralCount(@Req() request: any){
        return this.WordService.getGeneralCountOfWords(request.user.id)
    }
    @Get("getForFragment")
    getForFragment(@Req() request: any, @Query("fragment") fragment: string){
        console.log(fragment)
        return this.WordService.getSuitableWords(request.user.id, fragment)
    }
}