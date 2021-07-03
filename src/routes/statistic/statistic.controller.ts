import { Get, Controller, Param, Post, Body } from "@nestjs/common";
import { StatisticService } from "./statistic.service";
import { changeUserStatisticBodyType } from "./Types/statisticRouterTypes";

@Controller("statistic")
export class StatisticController{
    constructor(private readonly StatisticService: StatisticService){}
    @Get(":id")
    getUserStatistic(@Param('id') id){
        return this.StatisticService.getUserStatistic(id)
    }
    @Post(":id")
    changeUserStatistic(@Param("id") id, @Body() data: changeUserStatisticBodyType){
        let points: number = data.points
        return this.StatisticService.changeUserStatistic(id, points)
    }
}