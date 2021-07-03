import { Injectable } from "@nestjs/common";
import bounded from '../../database/relations'
import { getUserStatisticResponseBody } from "./Types/statisticRouterTypes";
const {Statistic} = bounded


@Injectable()
export class StatisticService{
    async getUserStatistic(id:number):Promise<getUserStatisticResponseBody>{
        let statistic = await Statistic.findOne({where: {userId: id}})
        return {
            message: "Статистика успешно получена",
            statistic
        }
    }
    async changeUserStatistic(id: number, points: number){
        let statistic = await Statistic.findOne({where: {userId: id}})
        statistic.poits += points
        await statistic.save()
        return {
            message: "Статистика обновлена"
        } 
    }
}