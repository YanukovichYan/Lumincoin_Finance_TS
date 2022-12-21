import {CustomHttp} from "../../../services/custom-http";
import config from "../../../config/config";
import {Sidebar} from "../sidebar";
import {CategoryType, CreateOperationFormType, DefaultResponseType, Operation} from "../../../types";

export class Form {

    readonly page: 'create' | 'edit'
    private categories: CategoryType[] | null
    private createFormValue: CreateOperationFormType | {}
    private optionById: Operation | {}
    private optionId: number
    readonly urlParams: number
    private urlSelectType: string | number
    private value: number

    private getType: 'income' | 'expense'
    readonly selectType: HTMLElement | null
    readonly selectCategory: HTMLElement | null
    readonly amount: HTMLElement | null
    readonly date: HTMLElement | null
    readonly comment: HTMLElement | null


    constructor(page: 'create' | 'edit') {
        this.page = page
        this.categories = null
        this.createFormValue = {}
        this.optionById = {}
        this.optionId = 0
        this.urlParams = Number(window.location.href.split('=')[1])
        this.urlSelectType = 'create'
        this.value = 0

        if (this.page === 'create') this.urlSelectType = this.urlParams

        this.getType = 'income'
        this.selectType = document.getElementById('select-type')
        this.selectCategory = document.getElementById('select-category')
        this.amount = document.getElementById('amount')
        this.date = document.getElementById('date')
        this.comment = document.getElementById('comment')

        this.init()
    }

    private init(): void {
        if (this.page === 'edit') {
            const saveBtn: HTMLElement | null = document.getElementById('save')
            const cancel: HTMLElement | null = document.getElementById('cancel')

            if (saveBtn) {
                saveBtn.innerText = 'Сохранить'
                saveBtn.onclick = () => this.edit()
                if (cancel) {
                    cancel.onclick = () => location.href = '#/table-categories'
                }
            }
            this.getOperationById()
        }
        this.fillingForm()
    }

    private async getOperationById(): Promise<void> {
        this.optionId = Number(location.hash.split('=')[1])
        try {
            const result: Operation | DefaultResponseType = await CustomHttp.request(`${config.host}/operations/${this.optionId}`)
            if (result) {
                if ((result as DefaultResponseType).error) {
                    alert((result as DefaultResponseType).message)
                }
                this.optionById = result
                this.editFormValue()
            }
        } catch (e) {
            console.log(e)
        }
    }

    private editFormValue(): void {
        if ('type' in this.optionById && this.selectType) {
            this.optionById.type === 'income' ? (this.selectType as HTMLSelectElement).selectedIndex = 1 : (this.selectType as HTMLSelectElement).selectedIndex = 2
            this.optionById.type === 'income' ? this.getType = 'income' : this.getType = 'expense'
            this.urlSelectType = this.getType
            this.getCategories()
            if (this.amount) {
                (this.amount as HTMLInputElement).value = this.optionById.amount.toString()
            }
            if (this.date) {
                (this.date as HTMLInputElement).value = this.optionById.date
            }
            if (this.comment) {
                (this.comment as HTMLInputElement).value = this.optionById.comment
            }
        }
    }

    private async getCategories(): Promise<void> {
        if (this.urlSelectType) {
            try {
                const result: CategoryType[] = await CustomHttp.request(`${config.host}/categories/${this.urlSelectType}`)
                if (result) {
                    this.categories = result
                    if (result.length === 0) {
                        console.log('Категорий нет!')
                    }
                    await Sidebar.getBalance()
                }
            } catch (e) {
                console.log(e)
            }
        }
        this.showCategoryOptions()
    }

    private showCategoryOptions(): void {
        const selectCategoryElement: HTMLElement | null = document.getElementById('select-category')

        if (this.categories) {
            const defaultOption: HTMLElement = document.createElement('option')
            defaultOption.innerText = 'Категория...'
            defaultOption.setAttribute('hidden', 'hidden')
            defaultOption.setAttribute('selected', 'selected')
            if (selectCategoryElement) {
                selectCategoryElement.appendChild(defaultOption)
            }

            this.categories.forEach((option: CategoryType) => {
                const optionCategory: HTMLElement = document.createElement('option')
                optionCategory.innerText = option.title;
                (optionCategory as HTMLInputElement).value = option.id.toString()
                if (selectCategoryElement) {
                    selectCategoryElement.appendChild(optionCategory)
                }
            })
            if (this.page === 'edit') this.showSelectCategory()
        }
    }

    private showSelectCategory(): void {
        if (this.categories) {
            const selectedCategoryIndex: number = this.categories.findIndex((category: CategoryType) => {
                if ('category' in this.optionById) {
                    return category.title === this.optionById.category
                }
            })
            if (this.selectCategory) {
                (this.selectCategory as HTMLSelectElement).selectedIndex = selectedCategoryIndex + 2
            }
        }
    }


    private fillingForm(): void {

        this.getCategories()

        if (this.selectType) {
            this.urlParams.toString() === 'income' ? (this.selectType as HTMLSelectElement).selectedIndex = 1 : (this.selectType as HTMLSelectElement).selectedIndex = 2
        }

        if (this.selectType) {
            this.selectType.onchange = () => {
                if (this.selectCategory) {
                    this.selectCategory.innerHTML = ' '
                    if (this.selectType) {
                        this.urlSelectType = (this.selectType as HTMLSelectElement).value
                    }
                    this.getCategories()
                }
            }
        }

        const formElement = document.getElementById('form')

        if (formElement) {
            formElement.onchange = () => {
                this.urlSelectType = (this.selectType as HTMLSelectElement).value

                this.createFormValue = {
                    type: (this.selectType as HTMLSelectElement)?.value,
                    amount: +((this.amount as HTMLInputElement)?.value),
                    date: (this.date as HTMLInputElement)?.value,
                    comment: (this.comment as HTMLInputElement)?.value,
                    category_id: +((this.selectCategory as HTMLSelectElement)?.value),
                }
            }
        }

        const saveElement: HTMLElement | null = document.getElementById('save')
        const cancelElement: HTMLElement | null = document.getElementById('cancel')

        if (saveElement) {
            if (this.page === 'create') saveElement.onclick = () => this.create()
        }

        if (cancelElement) {
            cancelElement.onclick = () => location.href = '#/table-categories'
        }
    }

    private async create(): Promise<void> {

        const currentBalance: number = await Sidebar.getBalance()

        if ((this.selectType as HTMLSelectElement).value === 'income') {
            this.value = currentBalance + +((this.amount as HTMLInputElement)?.value)
        } else {
            this.value = currentBalance - +((this.amount as HTMLInputElement)?.value)
        }

        try {
            const result: Operation | DefaultResponseType = await CustomHttp.request(`${config.host}/operations`, 'POST', this.createFormValue)
            if (result) {
                if ((result as DefaultResponseType).error) {
                    alert((result as DefaultResponseType).message)
                }
                if (result && !(result as DefaultResponseType).error) {
                    await Sidebar.updateBalance(this.value)
                    await Sidebar.getBalance()
                    location.href = '#/table-categories'
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    private async edit(): Promise<void> {
        try {
            const result: Operation | DefaultResponseType = await CustomHttp.request(`${config.host}/operations/${this.optionId}`, 'PUT', this.createFormValue)
            if (result) {
                if ((result as DefaultResponseType).error) {
                    alert((result as DefaultResponseType).message)
                }
                location.href = '#/table-categories'
            }
        } catch (e) {
            console.log(e)
        }
    }
}