import {CustomHttp} from "../../../services/custom-http";
import config from "../../../config/config";
import {Sidebar} from "../sidebar";
import {SeparationCategories} from "../../../services/separationCategories";
import {CategoryNamePageType, CategoryType, DefaultResponseType, Operation} from "../../../types";

export class Category {

    readonly page: CategoryNamePageType
    private categories: CategoryType[] | []
    private removeCardId: number
    private editCardId: number
    readonly urlParams: 'income' | 'expense'
    private amount: number
    private operations: Operation[] | []
    readonly createInput: HTMLElement | null

    constructor(page: CategoryNamePageType) {
        this.page = page
        this.categories = []
        this.removeCardId = 0
        this.editCardId = 0
        this.urlParams = 'income'
        this.amount = 0
        this.operations = []
        this.createInput = document.getElementById('create-input')


        this.page === "create-income" ? this.urlParams = 'income' : this.urlParams = 'expense'

        this.page === 'create-income' || this.page === 'create-expense' ? this.create() : this.init()

    }

    private async init(): Promise<void> {
        const emptyBlockElement = document.getElementById('empty-block')
        const cardWrapperElement = document.getElementById('card-wrapper')
        const createCategoryElement = document.getElementById('create-category')
        try {
            const result = await CustomHttp.request(`${config.host}/categories/${this.page}`)
            if (result) {
                this.categories = result
                if (result.length === 0 && emptyBlockElement) {
                    console.log('Категория пуста!')
                    emptyBlockElement.style.cssText = 'display:block!important'
                }
                if (cardWrapperElement) {
                    cardWrapperElement.innerHTML = ' '
                }
                this.showCategories()
                await Sidebar.getBalance()
                this.getOperations()
            }
        } catch (e) {
            console.log(e)
        }
        if (createCategoryElement) {
            createCategoryElement.onclick = () => location.href = `#/${this.page}/create-${this.page}`
        }
    }

    private showCategories(): void {
        const cardWrapper: HTMLElement | null = document.getElementById('card-wrapper')
        if (this.categories) {
            this.categories.forEach(category => {

                const card: HTMLElement | null = document.createElement('div')
                card.className = `p-3 border border-secondary rounded me-4 mb-3`
                card.style.cssText = "width: 352px"

                const cardTitle: HTMLElement | null = document.createElement('div')
                cardTitle.innerText = category.title
                cardTitle.className = `fs-4 fw-bold pb-2`

                const cardEditButton: HTMLElement | null = document.createElement('button')
                cardEditButton.innerText = "Редактировать"
                cardEditButton.className = `btn btn-primary me-2`
                cardEditButton.setAttribute('data-id', category.id.toString())
                cardEditButton.setAttribute('data-name', "edit")

                const cardRemoveButton: HTMLElement | null = document.createElement('button')
                cardRemoveButton.innerText = "Удалить"
                cardRemoveButton.className = `btn btn-danger`
                cardRemoveButton.setAttribute('data-id', category.id.toString())
                cardRemoveButton.setAttribute('data-bs-target', "#exampleModal")
                cardRemoveButton.setAttribute('data-bs-toggle', "modal")

                card.appendChild(cardTitle)
                card.appendChild(cardEditButton)
                card.appendChild(cardRemoveButton)
                if (cardWrapper) {
                    cardWrapper.prepend(card)
                }
            })
        }
        this.removeCard()
        this.editCard()
    }

    private async getOperations(): Promise<void> {
        try {
            const result: Operation[] = await CustomHttp.request(`${config.host}/operations?period=all`)
            if (result) {
                this.operations = result
                // await Sidebar.getBalance()
            }
        } catch (e) {
            console.log(e)
        }
    }

    private async create(): Promise<void> {
        await Sidebar.getBalance()
        const createButton: HTMLElement | null = document.getElementById('create-button')
        const createCancel: HTMLElement | null = document.getElementById('create-cancel')

        if (createButton && this.createInput) {
            createButton.onclick = () => {
                (this.createInput as HTMLInputElement).value
                this.createCategoryRequest()
            }
        }

        if (createCancel) {
            createCancel.onclick = () => location.href = `#/${this.urlParams}`
        }
    }

    private async createCategoryRequest(): Promise<void> {
        try {
            const result: CategoryType | DefaultResponseType = await CustomHttp.request(`${config.host}/categories/${this.urlParams}`, "POST", {
                title: (this.createInput as HTMLInputElement)?.value
            })

            if (result) {
                if ((result as DefaultResponseType).error) {
                    alert((result as DefaultResponseType).message)
                    throw new Error((result as DefaultResponseType).message)
                }
                location.href = `#/${this.urlParams}`
            }
        } catch (e) {
            console.log(e)
        }
    }

    private removeCard(): void {
        let removeButtons: NodeListOf<Element> | null = document.querySelectorAll('.btn-danger')
        const confirmDeleteElement = document.getElementById('confirm-delete')

        removeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.removeCardId = Number(btn.getAttribute('data-id'))
                this.removeCategoryAmount()
            })
        })

        if (confirmDeleteElement) {
            confirmDeleteElement.onclick = () => this.removeCardRequest()
        }
    }

    private async removeCategoryAmount(): Promise<void> {
        if (this.removeCardId) {
            let amount: number = SeparationCategories.getSeparateCategory(this.operations, this.removeCardId, this.categories)

            const currentBalance: number = await Sidebar.getBalance()

            if (this.page === 'income') {
                this.amount = currentBalance - amount
            } else {
                this.amount = currentBalance + amount
            }
        }
    }

    private async removeCardRequest(): Promise<void> {
        try {
            const result: DefaultResponseType = await CustomHttp.request(`${config.host}/categories/${this.page}/${this.removeCardId}`, 'DELETE')
            if (result) {
                this.init()
                await Sidebar.updateBalance(this.amount)
                console.log(result.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    private editCard(): void {
        let editButtons: NodeListOf<Element> | null = document.querySelectorAll('button[data-name="edit"]')
        editButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.editCardId = Number(btn.getAttribute('data-id'))
                location.href = `#/${this.page}/edit-${this.page}?id=${this.editCardId}`
            })
        })
    }
}