export type loginInType = {
    login: string,
    password: string,
    rememberMe: boolean
}

export type statisticResponseType = {
    statistic: {
        points: number
    }
}

export type statisticSearchType ={
        points: number
    }



export type loginInResponse = Omit<loginInType, "password"|"rememberMe">&statisticResponseType&{token: string, id: number, message: string, isRemember: boolean, role: "user"|"admin"}
export type getLoginResponseType = Omit<loginInType, "password"|"rememberMe">&statisticResponseType&{id: number, message: string, role: "user"|"admin"}

export type userFromTokenType = {
    login: string,
    id: number
}

export type userType = {
    login: string,
    id: number,
    password: string
}