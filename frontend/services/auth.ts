import config from "../config/config";
import {DefaultResponseType, RefreshReturnType, UserInfoType} from "../types";

export class Auth {

    public static accessTokenKey: string = 'accessToken'
    private static refreshTokenKey: string = 'refreshToken'
    private static userInfoKey: string = 'userInfo'

    public static setTokens(accessToken: string, refreshToken: string) {
        localStorage.setItem(this.accessTokenKey, accessToken)
        localStorage.setItem(this.refreshTokenKey, refreshToken)
    }

    private static removeTokens() {
        localStorage.removeItem(this.accessTokenKey)
        localStorage.removeItem(this.refreshTokenKey)
    }

    public static setUserInfo(user: UserInfoType) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(user))
    }

    public static getUserInfo(): UserInfoType | null  {
        const userInfo: string | null = localStorage.getItem(this.userInfoKey)
        return userInfo ? JSON.parse(userInfo) : null
    }

    public static async logout(): Promise<boolean> {
        const refreshToken: string | null = localStorage.getItem(this.refreshTokenKey)
        const response: Response = await fetch(`${config.host}/logout`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({refreshToken: refreshToken})
        })

        if (response && response.status === 200) {
            const result: DefaultResponseType = await response.json()
            if (result && !result.error) {
                this.removeTokens()
                localStorage.removeItem(Auth.userInfoKey)
                return true
            }
        }
        return false
    }

    public static async refresh(): Promise<boolean> {
        const refreshToken: string | null = localStorage.getItem(this.refreshTokenKey)

        if (refreshToken) {
            const response: Response = await fetch(`${config.host}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({refreshToken: refreshToken})
            })

            if (response && response.status === 200) {
                const result: RefreshReturnType | DefaultResponseType = await response.json()
                if (result as DefaultResponseType) {
                    if (!(result as DefaultResponseType).error && (result as RefreshReturnType).tokens) {
                        this.setTokens((result as RefreshReturnType).tokens.accessToken, (result as RefreshReturnType).tokens.refreshToken)
                        return true
                    }
                }
            }
        }
        localStorage.removeItem(this.userInfoKey)
        this.removeTokens()
        location.href = '#/login'
        return false
    }
}