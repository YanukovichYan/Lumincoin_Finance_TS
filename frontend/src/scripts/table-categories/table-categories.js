import {CustomHttp} from "../../../services/custom-http.js";
import config from "../../../config/config.js";
import {Sidebar} from "../sidebar.js";

export class TableCategories {

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
        this.init()
    }

    init() {
        document.getElementById('create-income').onclick = () => location.href = `#/table-categories/create_income-or-expenses?operations=income`

        document.getElementById('create-expense').onclick = () => location.href = `#/table-categories/create_income-or-expenses?operations=expense`

        const dateFrom = document.getElementById('date-from')
        const dateTo = document.getElementById('date-to')
        const dateInterval = document.getElementById('date-interval')

        dateInterval.onchange = () => {
            const dateInterval = `&dateFrom=${dateFrom.value}&dateTo=${dateTo.value}`
            if (dateFrom.value && dateTo.value) {
                this.dateInterval = dateInterval
                this.getDataTable()
                console.log(this.dateInterval)
                console.log('Получили данные, отправляем запрос')
            }
        }
        this.getDataTable()
        this.showThead()
        this.showFilterBtn()
    }

    async getDataTable() {
        await Sidebar.getBalance()

        if (this.filterValue === 'interval' && this.dateInterval === '') {
            return
        }
        try {
            const result = await CustomHttp.request(`${config.host}/operations?period=${this.filterValue}${this.dateInterval}`)
            // console.log(result)
            if (result) {
                this.operations = result
                document.getElementById('tbody').innerHTML = ' '
                this.showTable()
            }
            if (result.length === 0) {
                // await Sidebar.getBalance()
            }
        } catch (e) {
            console.log(e)
        }
    }

    showTable() {
        if (this.operations) {

            const tbody = document.getElementById('tbody')

            this.operations.forEach((operation, index) => {
                const tr = document.createElement('tr')

                const number = document.createElement('td')
                number.className = `text-center fw-bold`
                number.innerText = `${index + 1} `
                number.innerText = `${index + 1} `

                const type = document.createElement('td')
                type.className = operation.type === 'income' ? 'text-center text-success' : 'text-center text-danger'
                type.innerText = operation.type === 'income' ? 'доход' : 'расход'

                const category = document.createElement('td')
                category.className = 'text-center'
                // this.createBlock('td', `text-center`)
                category.innerText = operation.category || null

                const amount = document.createElement('td')
                amount.className = `text-center`
                amount.innerText = `${operation.amount} $`

                const validDate = operation.date.split('-')
                const date = document.createElement('td')
                date.className = `text-center`
                date.innerText = `${validDate[2]}.${validDate[1]}.${validDate[0]}`

                const comment = document.createElement('td')
                comment.className = `text-center`
                comment.innerText = operation.comment

                const trash = document.createElement('td')
                trash.className = `text-center`
                trash.setAttribute('role', 'button')
                trash.setAttribute('data-name', 'delete')
                trash.setAttribute('data-id', operation.id)
                trash.setAttribute('data-bs-target', "#exampleModal")
                trash.setAttribute('data-bs-toggle', "modal")

                const trashImg = document.createElement('img')
                trashImg.setAttribute('src', '/images/trash-icon.png')
                trashImg.setAttribute('alt', 'trash')
                trash.appendChild(trashImg)

                const edit = document.createElement('td')
                edit.className = `text-center`
                edit.setAttribute('role', 'button')
                edit.setAttribute('data-name', 'edit')
                edit.setAttribute('data-id', operation.id)

                const editImg = document.createElement('img')
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

                tbody.appendChild(tr)
            })
        }
        this.removeOption()
        this.edit()
    }

    showThead() {
        config.theadTitle.forEach(ttl => {
            const title = document.createElement('th')
            title.innerText = ttl
            title.className = 'text-center'
            document.getElementById('thead').appendChild(title)
        })
    }

    showFilterBtn() {
        let active = true;
        config.dataBtn.forEach((btn, index) => {
            const filterBtn = document.createElement('button')
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

                let allFilterBtn = document.querySelectorAll('button[data-name="filter"]')
                allFilterBtn.forEach(el => {
                    el.classList.add('btn-light')
                    el.classList.remove('btn-secondary')
                })

                this.btnFilterClick.classList.add('btn-secondary')
                this.btnFilterClick.classList.remove('btn-light')

                document.getElementById('tbody').innerHTML = ' '

                this.selectOperationsWithFilter()
            })
            document.getElementById('btn-wrapper').appendChild(filterBtn)
        })
    }

    selectOperationsWithFilter() {
        switch (this.btnFilterClick.innerText) {
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

    async removeOption() {
        let removeOptions = document.querySelectorAll('td[data-name="delete"]')

        removeOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.removeOptionId = option.getAttribute('data-id')
            })
        })

        document.getElementById('confirm-delete').onclick = () => {
            this.getOptionsById()
            this.removeOptionRequest()
        }
    }

    async getOptionsById() {
        try {
            const result = await CustomHttp.request(`${config.host}/operations/${this.removeOptionId}`)
            if (result) {
                if (result.error) {
                    alert(result.message)
                }
                this.optionById = result
                console.log('this.optionById', this.optionById)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async removeOptionRequest() {
        const currentBalance = await Sidebar.getBalance()
        console.log('currentBalance', currentBalance)

        if (this.optionById?.type === 'income') {
            this.value = currentBalance - this.optionById.amount
        } else {
            this.value = currentBalance + this.optionById.amount
        }
        console.log(this.value)
        console.log(this.optionById.amount)

        try {
            const result = await CustomHttp.request(`${config.host}/operations/${this.removeOptionId}`, 'DELETE')
            if (result) {
                if (!result.error) {
                    console.log(result.message)
                    await Sidebar.updateBalance(this.value)
                    await this.getDataTable()
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    edit() {
        const editButtons = document.querySelectorAll('td[data-name="edit"]')

        editButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.btnEditId = btn.getAttribute('data-id')
                location.href = `#/table-categories/edit_income-or-expense?id=${this.btnEditId}`
            })
        })
    }
}