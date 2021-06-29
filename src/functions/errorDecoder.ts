type errorDecoderTypes = "loginisation" | "statistic" | "validation"

export const errorDecoder = (err: string, type: errorDecoderTypes):string => {
    switch(type){
        case "validation": {
            if (err.match(/Validation len on login/)){
                return "Длина логина не соответствует запрашиваемой"
            }
            if (err.match(/Уже существует/)){
                return "Такой пользователь уже существует"
            }
        }
        case "loginisation": {           
            if (err.match(/Такого пользователя не существует/)){
                return "Такого пользователя не существует"
            }
            if (err.match(/Неверный пароль/)){
                return "Неверный пароль"
            }
            if (err.match(/Такого пользователя нет/)){
                return "Такого пользователя нет"
            }
        }
    }
    return err
}