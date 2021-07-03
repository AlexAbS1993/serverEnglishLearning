import { statisticResponseType } from "src/routes/user/types/userServiceTypes";

export type getUserStatisticResponseBody = {
    message: string,
    statistic: {
        points: number
    }
}

export type changeUserStatisticBodyType = {
    points: number
}