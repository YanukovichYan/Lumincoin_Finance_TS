import {CustomHttp} from "../../services/custom-http";
import {Auth} from "../../services/auth";
import config from "../../config/config";

export class Sidebar {

    public static async getBalance(): Promise<number | null> {
        const balanceElement = document.getElementById('balance')
        if (localStorage.getItem(Auth.accessTokenKey)) {
            try {
                const result: { balance: number } = await CustomHttp.request(`${config.host}/balance`)
                if (balanceElement) balanceElement.innerText = `${result.balance}$`
                if (result) {
                    return result.balance
                }
            } catch (e) {
                console.log(e)

            }
        }
        return null
    }

    public static async updateBalance(newBalance: number): Promise<void> {

        const balanceElement = document.getElementById('balance')
        if (localStorage.getItem(Auth.accessTokenKey)) {
            try {

                const result = await CustomHttp.request(`${config.host}/balance`, 'PUT', {
                    newBalance
                })
                if (balanceElement) {
                    balanceElement.innerText = `${result.balance}$`
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
}

