import {CustomHttp} from "../../../services/custom-http";
import config from "../../../config/config";
import {Sidebar} from "../sidebar";
import {DefaultResponseType, Operation} from "../../../types";

export class TableCategories {

    readonly dateToday: string
    private filterValue: string
    private operations: Operation[] | null
    private removeOptionId: number | null
    private btnEditId: number | null
    private dateInterval: string | null
    private btnFilterClick: HTMLElement | null
    private optionById: Operation | null
    private value: number | null
    readonly tbodyElement: HTMLElement | null

    constructor() {
        this.dateToday = `${new Date().getFullYear()}-${(new Date().getMonth()) + 1}-${new Date().getDate()}`
        this.filterValue = `interval&dateFrom=${this.dateToday}&dateTo=${this.dateToday}`
        this.operations = null
        this.removeOptionId = null
        this.btnEditId = null
        this.dateInterval = ''
        this.btnFilterClick = null
        this.optionById = null
        this.value = null
        this.tbodyElement = document.getElementById('tbody')
        this.init()
    }

    private init(): void {
        const createIncomeElement: HTMLElement | null = document.getElementById('create-income')
        const createExpenseElement: HTMLElement | null = document.getElementById('create-expense')

        if (createIncomeElement) {
            createIncomeElement.onclick = () => location.href = `#/table-categories/create_income-or-expenses?operations=income`
        }

        if (createExpenseElement) {
            createExpenseElement.onclick = () => location.href = `#/table-categories/create_income-or-expenses?operations=expense`
        }

        const dateFrom: HTMLInputElement | null = document.getElementById('date-from') as HTMLInputElement
        const dateTo: HTMLInputElement | null = document.getElementById('date-to') as HTMLInputElement
        const dateIntervalElement: HTMLElement | null = document.getElementById('date-interval')

        if (dateIntervalElement) {
            dateIntervalElement.onchange = () => {
                if (dateFrom.value && dateTo.value) {
                    this.dateInterval = `interval&dateFrom=${dateFrom.value}&dateTo=${dateTo.value}`
                    this.getDataTable()

                    console.log('Получили данные, отправляем запрос')
                }
            }
        }
        this.getDataTable()
        this.showThead()
        this.showFilterBtn()
    }

    private async getDataTable(): Promise<void> {

        if (this.filterValue === 'interval' && !this.dateInterval) {
            return
        }
        await Sidebar.getBalance()

        try {
            const result: Operation[] | [] = await CustomHttp.request(`${config.host}/operations?period=${!this.dateInterval ? this.filterValue : ''}${this.dateInterval}`)

            if (result) {
                this.operations = result
                if (this.tbodyElement) {
                    this.tbodyElement.innerHTML = ' '
                }
                this.showTable()
            }
        } catch (e) {
            console.log(e)
        }
    }

    private showTable(): void {
        if (this.operations) {

            this.operations.forEach((operation: Operation, index: number) => {
                const tr: HTMLElement = document.createElement('tr')

                const number: HTMLElement = document.createElement('td')
                number.className = `text-center fw-bold`
                number.innerText = `${index + 1} `
                number.innerText = `${index + 1} `

                const type: HTMLElement = document.createElement('td')
                type.className = operation.type === 'income' ? 'text-center text-success' : 'text-center text-danger'
                type.innerText = operation.type === 'income' ? 'доход' : 'расход'

                const category: HTMLElement = document.createElement('td')
                category.className = 'text-center'
                // this.createBlock('td', `text-center`)
                category.innerText = operation.category || ''

                const amount: HTMLElement = document.createElement('td')
                amount.className = `text-center`
                amount.innerText = `${operation.amount} $`

                const validDate: string[] = operation.date.split('-')
                const date: HTMLElement = document.createElement('td')
                date.className = `text-center`
                date.innerText = `${validDate[2]}.${validDate[1]}.${validDate[0]}`

                const comment: HTMLElement = document.createElement('td')
                comment.className = `text-center`
                comment.innerText = operation.comment

                const trash: HTMLElement = document.createElement('td')
                trash.className = `text-center`
                trash.setAttribute('role', 'button')
                trash.setAttribute('data-name', 'delete')
                trash.setAttribute('data-id', operation.id.toString())
                trash.setAttribute('data-bs-target', "#exampleModal")
                trash.setAttribute('data-bs-toggle', "modal")

                const trashImg: HTMLElement = document.createElement('img')
                trashImg.setAttribute('src', '/images/trash-icon.png')
                trashImg.setAttribute('alt', 'trash')
                trash.appendChild(trashImg)

                const edit: HTMLElement = document.createElement('td')
                edit.className = `text-center`
                edit.setAttribute('role', 'button')
                edit.setAttribute('data-name', 'edit')
                edit.setAttribute('data-id', operation.id.toString())

                const editImg: HTMLElement = document.createElement('img')
                editImg.setAttribute('src', '/images/pen-icon.png')
                editImg.setAttribute('alt', 'pen')
                edit.appendChild(editImg)

                tr.appendChild(number)
                tr.appendChild(type)
                tr.appendChild(category)
                tr.appendChild(amount)
                tr.appendChild(date)
                tr.appendChild(comment)
                tr.appendChild(trash)
                tr.appendChild(edit)

                if (this.tbodyElement) {
                    this.tbodyElement.appendChild(tr)
                }
            })
        }
        this.removeOption()
        this.edit()
    }

    private showThead(): void {
        config.theadTitle.forEach((ttl: string) => {
            const title: HTMLElement = document.createElement('th')
            const theadElement = document.getElementById('thead')
            title.innerText = ttl
            title.className = 'text-center'
            if (theadElement) theadElement.appendChild(title)
        })
    }

    private showFilterBtn(): void {
        let active: boolean = true;
        config.dataBtn.forEach((btn: string, index: number) => {
            const filterBtn: HTMLElement = document.createElement('button')
            filterBtn.innerText = btn
            filterBtn.setAttribute('data-name', 'filter')
            filterBtn.className = 'btn btn-light border border-secondary me-3 px-3'

            if (active && index === 0) {
                filterBtn.classList.remove('btn-light')
                filterBtn.classList.add('btn-secondary')
            }

            filterBtn.addEventListener('click', () => {
                active = false
                this.btnFilterClick = filterBtn
                this.dateInterval = ''

                let allFilterBtn: NodeListOf<Element> | null = document.querySelectorAll('button[data-name="filter"]')
                allFilterBtn.forEach((el: Element) => {
                    el.classList.add('btn-light')
                    el.classList.remove('btn-secondary')
                })

                this.btnFilterClick.classList.add('btn-secondary')
                this.btnFilterClick.classList.remove('btn-light')

                if (this.tbodyElement) this.tbodyElement.innerHTML = ' '

                this.selectOperationsWithFilter()
            })
            const btnWrapperElement: HTMLElement | null = document.getElementById('btn-wrapper')
            if (btnWrapperElement) {
                btnWrapperElement.appendChild(filterBtn)
            }
        })
    }

    private selectOperationsWithFilter(): void {
        switch (this.btnFilterClick?.innerText) {
            case 'Сегодня':
                this.filterValue = `interval&dateFrom=${this.dateToday}&dateTo=${this.dateToday}`
                break
            case 'Неделя':
                this.filterValue = 'week'
                break
            case 'Месяц':
                this.filterValue = 'month'
                break
            case 'Год':
                this.filterValue = 'year'
                break
            case 'Все':
                this.filterValue = 'all'
                break
            case 'Интервал':
                this.filterValue = 'interval'
                break
        }
        this.getDataTable()
    }

    // createBlock(tag, className) {
    //     const block = document.createElement(tag)
    //     if (className) {
    //         block.classList.add(className)
    //     }
    //     return block
    // }

    private async removeOption(): Promise<void> {
        const removeOptions: NodeListOf<Element> | null = document.querySelectorAll('td[data-name="delete"]')
        const confirmDeleteElement = document.getElementById('confirm-delete')

        removeOptions.forEach((option: Element) => {
            option.addEventListener('click', () => {
                this.removeOptionId = Number(option.getAttribute('data-id'))
            })
        })

        if (confirmDeleteElement) {
            confirmDeleteElement.onclick = () => {
                this.getOptionsById()
                this.removeOptionRequest()
            }
        }
    }

    private async getOptionsById(): Promise<void> {
        try {
            const result: Operation | DefaultResponseType = await CustomHttp.request(`${config.host}/operations/${this.removeOptionId}`)
            if (result) {
                if ((result as DefaultResponseType).error) {
                    alert((result as DefaultResponseType).message)
                }
                this.optionById = result as Operation
            }
        } catch (e) {
            console.log(e)
        }
    }

    private async removeOptionRequest(): Promise<void> {
        const currentBalance: number | null = await Sidebar.getBalance()

        if (this.optionById && currentBalance) {
            if (this.optionById?.type === 'income') {
                this.value = currentBalance - this.optionById.amount
            } else {
                this.value = currentBalance + this.optionById.amount
            }
        }

        try {
            const result: DefaultResponseType = await CustomHttp.request(`${config.host}/operations/${this.removeOptionId}`, 'DELETE')
            if (result) {
                if (!result.error) {
                    // console.log(result.message)
                    if (this.value) {
                        await Sidebar.updateBalance(this.value)
                    }
                    await this.getDataTable()
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    private edit(): void {
        const editButtons: NodeListOf<Element> | null = document.querySelectorAll('td[data-name="edit"]')

        editButtons.forEach((btn: Element) => {
            btn.addEventListener('click', () => {
                this.btnEditId = Number(btn.getAttribute('data-id'))
                location.href = `#/table-categories/edit_income-or-expense?id=${this.btnEditId}`
            })
        })
    }
}