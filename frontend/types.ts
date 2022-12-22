export type Operation = {
    amount: number
    category: string
    comment: string
    date: string
    id: number
    type: string
}

export type DefaultResponseType = {
    error: boolean
    message: string
    validation?: { key: string, message: string }[]
}

export type UserInfoType = {
    id: number
    lastName: string
    name: string
}

export type TokensType = {
    accessToken: string
    refreshToken: string
}

export type RefreshReturnType = {
    tokens: TokensType
}

export type FieldsType = {
    name: string
    id: string
    element: HTMLInputElement | null
    regex: RegExp
    valid: boolean
}

export type SignupResponseType = {
    user: { id: number, email: string, name: string, lastName: string },
}

export type LoginResponseType = {
    tokens: TokensType
    user: { id: number, name: string, lastName: string },
}

export type RouteType = {
    route: string
    title: string
    template: string
    load(): void
}

export type CategoryNamePageType = 'income' | 'create-income' | 'expense' | 'create-expense'

export type CategoryType = {
    id: number
    title: string
}

export type SeparationCatNewObgType = {
    [key: string]: Operation[]
}

export type CreateOperationFormType = {
    type: string
    amount: number
    date: Date
    comment: string
    category_id: number
}

export type newObjectWithSeparate = {[key: string]: Operation[]}