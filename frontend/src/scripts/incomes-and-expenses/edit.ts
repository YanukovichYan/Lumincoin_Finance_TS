import {CustomHttp} from "../../../services/custom-http";
import config from "../../../config/config";
import {Sidebar} from "../sidebar";
import {CategoryType, DefaultResponseType} from "../../../types";

export class Edit {

    readonly page: 'income' | 'expense'
    readonly editCardId: number
    readonly editInput: HTMLElement | null
    private newValueOnInput: string | ''

    constructor(page: 'income' | 'expense') {
        this.page = page
        this.editCardId = Number(window.location.hash.split('=')[1])
        this.editInput = document.getElementById('edit-input')
        this.newValueOnInput = ''

        this.init()
    }

    private async init(): Promise<void> {
        const saveEditBtn = document.getElementById('save-edit-btn')
        const cancelBtn = document.getElementById('cancel-btn')

        try {
            const result: CategoryType = await CustomHttp.request(`${config.host}/categories/${this.page}/${this.editCardId}`)
            if (result && this.editInput) {
                (this.editInput as HTMLInputElement).value = result.title
                await Sidebar.getBalance()
            }
        } catch (e) {
            console.log(e)
        }

        if (this.editInput) {
            this.editInput.onchange = (e: Event) => this.newValueOnInput = (e.target as HTMLInputElement)?.value
        }

        if (saveEditBtn) {
            saveEditBtn.onclick = () => this.saveEdit()
        }

        if (cancelBtn) {
            cancelBtn.onclick = () => location.href = `#/${this.page}`
        }
    }

    private async saveEdit(): Promise<void> {
        try {
            const result: DefaultResponseType = await CustomHttp.request(`${config.host}/categories/${this.page}/${this.editCardId}`, 'PUT', {
                title: this.newValueOnInput
            })
            if (result) location.href = `#/${this.page}`
                } catch (e) {
            console.log(e)
        }
    }
}