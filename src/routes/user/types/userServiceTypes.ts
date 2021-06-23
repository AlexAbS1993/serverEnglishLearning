export type loginInType = {
    login: string,
    password: string,
    isRemember: boolean
}

export type statisticResponseType = {
    statistic: {
        points: number
    }
}

export type statisticSearchType ={
        points: number
    }



export type loginInResponse = Omit<loginInType, "password">&statisticResponseType&{token: string}
export type getLoginResponseType = Omit<loginInType, "password"|"isRemember">&statisticResponseType&{id: number}

export type userFromTokenType = {
    login: string,
    id: number
}

export type userType = {
    login: string,
    id: number,
    password: string
}