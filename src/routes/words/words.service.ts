import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import User from "src/database/models/user.model";
import Word from "src/database/models/word.model";
import userWord from 'src/database/models/userWordThrough'
import { errorDecoder } from "src/functions/errorDecoder";
import { wordBodyObject } from "./Types/words.service.types";


@Injectable()
export class WordService{
    async AddNewWordToDictionary(body: wordBodyObject, user: any){
        let candidate
        let newWord
        try {
            candidate = await User.findOne({where: {id: user.id}})
            newWord =  await Word.create({
                value: body.value,
                engDiscription: body.engDiscription,
                ruTranslate: body.ruTranslate,
                imgSrc: body.imgSrc,
                cathegories: body.cathegories,
                awareness: body.awareness ? body.awareness : 0
            })}
            catch(e){
                throw new HttpException(errorDecoder(e.message, "validation"), HttpStatus.BAD_REQUEST)
            }
            try{
                await candidate.addWord(newWord)
                await candidate.save()
                return {
                    message: "Слово добавлено в словарь"
                }
            }
            catch(e){
            throw new HttpException(errorDecoder("Невозможно создать слово", "words"), HttpStatus.BAD_REQUEST)
        }
    }
    async getUsersWords(user: any){
        try{
            const candidate = await User.findOne({where: {id: user.id}, include: [Word]})
            return {
                message: "Слова получены",
                words: [
                    ...candidate.words
                ]
            }
        }
        catch(e){

        }
    }
    async getOneWord(id: number){
        try{
            const word = await Word.findOne({where: {id: id}})
            return {
                message: "Слово получено",
                ...word
            }
        }
        catch(e){
            throw new HttpException(errorDecoder(e.message, "words"), HttpStatus.BAD_REQUEST)
        }
    }
    async deleteWord(id:number, userId: number){
        try{
            let candidate = await User.findOne({where: {id: userId}, include: Word})
            let isCandidatesWord = candidate.words.some((element) => element.id === id)
            if (!isCandidatesWord){
                throw new HttpException(errorDecoder("Эта запись не принадлежит данному пользователю", "words"), HttpStatus.BAD_REQUEST)
            }
            await Word.destroy({where: {
                id: id
            }})
            return {
                message: "Успешно удалено"
            }
        }
        catch(e){
            throw new HttpException(errorDecoder(e.message, "words"), HttpStatus.BAD_REQUEST)
        }
    }
    async wordBaseCount(){
        let count = Word.count()
        return {
            message: "Данные о количестве слов получены",
            count
        }
    }
    async getCountWords(count: number, userId){
        try{
            let generalCount: number = await userWord.count({where: {userId: userId}})
            if (generalCount < count){
                return {
                    message: "Слова получены",
                    words: [
                        ...await userWord.findAll({where: {userId: userId}, include: [Word]})
                    ]
                }
            }
            let offset = generalCount - count
            let words = await userWord.findAll({where: {userId: userId}, offset: offset, count: count, include: [Word]})
            return {
                message: "Слова получены",
                words: [
                    ...words
                ]
            }
        }
        catch(e){
            throw new HttpException(errorDecoder(e.message, "words"), HttpStatus.BAD_REQUEST)
        }
       
    }
}