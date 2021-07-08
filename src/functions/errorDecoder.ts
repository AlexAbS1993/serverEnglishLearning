import console from "console"

type errorDecoderTypes = "loginisation" | "statistic" | "validation"|"words"

export const errorDecoder = (err: string, type: errorDecoderTypes):string => {
    switch(type){
        case "validation": {
            if (err.match(/Validation len on login/)){
                return "Длина логина не соответствует запрашиваемой"
            }
            if (err.match(/Уже существует/)){
                return "Такой пользователь уже существует"
            }
            if (err.match(/ruTranslate cannot be null/gi)){
                return "Значение перевода не может быть пустым"
            }
            if (err.match(/imgSrc cannot be null/)){
                return "Ссылка на картинку обязательна"
            }
            if (err.match(/cathegories cannot be null/)){
                return "Категория не может быть пустой"
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
        case "words": {
            if (err.match(/Невозможно создать слов/)){
                return "Невозможно создать слово"
            }
            if (err.match(/Эта запись не принадлежит данному пользователю/)){
                return "Эта запись не принадлежит данному пользователю"
            }
        }
    }
    return err
}