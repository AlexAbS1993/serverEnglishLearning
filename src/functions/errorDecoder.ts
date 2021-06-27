export const errorDecoder = (err: string) => {
    if (err.match(/Validation len on login/)){
        return "Длина логина не соответствует запрашиваемой"
    }
}