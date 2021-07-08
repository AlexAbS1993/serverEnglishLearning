type keyValuesType = "is"|"len"|"isUrl"
type typesType = "regexp"

export type validationType = {
    [key: string]: {
        [key: string]: {
            value: number[]|string[],
            type?: typesType,
            message: string
        }
    }
}