import config from "../../../config/config";
import {CustomHttp} from "../../../services/custom-http";
import {Sidebar} from "../sidebar";
import {DefaultResponseType, newObjectWithSeparate, Operation} from "../../../types";
import Chart from 'chart.js/auto'


export class Main {
    readonly chartIncome: CanvasRenderingContext2D | any
    readonly chartExpense: CanvasRenderingContext2D | any

    readonly dateToday: string
    private filterValue: string

    private dateInterval: string
    private btnFilterClick: HTMLElement | null

    private categoriesIncome: string[]
    private categoriesExpense: string[]

    private operations: Operation[] | []

    private incomeDataAmount: number[]
    private expenseDataAmount: number[]

    private myChartIncome: Chart | null
    private myChartExpense: Chart | null

    constructor() {

        this.chartIncome = (document.getElementById('chart-income') as HTMLCanvasElement)?.getContext('2d')
        this.chartExpense = (document.getElementById('chart-expense') as HTMLCanvasElement)?.getContext('2d')

        this.dateToday = `${new Date().getFullYear()}-${(new Date().getMonth()) + 1}-${new Date().getDate()}`
        this.filterValue = `interval&dateFrom=${this.dateToday}&dateTo=${this.dateToday}`

        this.dateInterval = ''
        this.btnFilterClick = null

        this.categoriesIncome = []
        this.categoriesExpense = []

        this.operations = []

        this.incomeDataAmount = []
        this.expenseDataAmount = []

        this.myChartIncome = null
        this.myChartExpense = null

        this.intervalInit()
    }

    private intervalInit(): void {

        const dateFrom: HTMLElement | null = document.getElementById('date-from')
        const dateTo: HTMLElement | null = document.getElementById('date-to')
        const dateInterval: HTMLElement | null = document.getElementById('date-interval')

        if (dateInterval) {
            dateInterval.onchange = () => {
                const dateInterval: string = `&dateFrom=${(dateFrom as HTMLInputElement)?.value}&dateTo=${(dateTo as HTMLInputElement)?.value}`
                if ((dateFrom as HTMLInputElement)?.value && (dateTo as HTMLInputElement)?.value) {
                    this.dateInterval = dateInterval
                    this.getDataTable()
                    console.log('this.dateInterval', this.dateInterval)
                    console.log('Получили данные, отправляем запрос')
                }
            }
        }

        this.showFilterBtn()
        this.getDataTable()
    }

    private async getDataTable(): Promise<void> {
        if (this.filterValue === 'interval' && this.dateInterval === '') {
            return
        }
        try {
            const result: Operation[] | DefaultResponseType = await CustomHttp.request(`${config.host}/operations?period=${this.filterValue}${this.dateInterval}`)
            if (result) {
                this.operations = result as Operation[]
                await Sidebar.getBalance()
                this.separationCategories()
            }
        } catch (e) {
            console.log(e)
        }
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

                this.categoriesIncome = []
                this.categoriesExpense = []

                this.incomeDataAmount = []
                this.expenseDataAmount = []
                this.selectOperationsWithFilter()
            })
            const btnWrapperElement = document.getElementById('btn-wrapper')

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

    private incomeChartShow(): void {

        if (this.myChartIncome != null) {
            this.myChartIncome.destroy()
        }

        this.myChartIncome = new Chart(this.chartIncome, {
            type: 'pie',
            data: {
                labels: this.categoriesIncome,
                datasets: [{
                    data: this.incomeDataAmount,
                    backgroundColor: [
                        '#DC3545',
                        '#20C997',
                        '#0D6EFD',
                        '#FFC107',
                        '#FD7E14',
                    ]
                }]
            },
            options: {
                responsive: false,
                plugins: {}
            },
        })
    }

    expenseChartShow() {

        if (this.myChartExpense != null) {
            this.myChartExpense.destroy()

        }

        this.myChartExpense = new Chart(this.chartExpense, {
            type: 'pie',
            data: {
                labels: this.categoriesExpense,
                datasets: [{
                    data: this.expenseDataAmount,
                    backgroundColor: [
                        '#0D6EFD',
                        '#FFC107',
                        '#20C997',
                        '#FD7E14',
                        '#DC3545',
                    ]
                }]
            },
            options: {
                responsive: false,
                plugins: {}
            },
        })
    }

    private separationCategories(): void {
        const incomeOperation: Operation[] = this.operations.filter((el: Operation) => {
            return el.type === 'income'
        })

        const expenseOperation: Operation[] = this.operations.filter((el) => {
            return el.type === 'expense'
        })

        const newObjectIncome: newObjectWithSeparate = incomeOperation.reduce((object: newObjectWithSeparate, operation: Operation) => {
            if (object[operation.category]) {
                object[operation.category].push(operation)
            } else {
                object[operation.category] = [operation]
            }
            return object
        }, {})

        const newObjectExpense: newObjectWithSeparate = expenseOperation.reduce((object: newObjectWithSeparate, operation: Operation) => {
            if (object[operation.category]) {
                object[operation.category].push(operation)
            } else {
                object[operation.category] = [operation]
            }
            return object
        }, {})

        Object.entries(newObjectIncome).forEach((category: [string, Operation[]]) => {
            return this.categoriesIncome.push(category[0]);
        })

        Object.entries(newObjectExpense).forEach((category: [string, Operation[]]) => {
            return this.categoriesExpense.push(category[0]);
        })

        Object.entries(newObjectIncome).forEach(category => {
            let amount: number = 0
            category[1].forEach((operation: Operation) => {
                amount += operation.amount
            })
            this.incomeDataAmount.push(amount)
        })

        Object.entries(newObjectExpense).forEach(category => {
            let amount: number = 0
            category[1].forEach((operation: Operation) => {
                amount += operation.amount
            })
            this.expenseDataAmount.push(amount)
        })

        if (this.incomeDataAmount.length) {
            this.incomeChartShow()
        }

        if (this.expenseDataAmount.length) {
            this.expenseChartShow()
        }

        const mainElement = document.getElementById('main')
        const emptyBlock = document.getElementById('empty-block')

        if (this.incomeDataAmount.length === 0 && this.expenseDataAmount.length === 0) {
            if (mainElement && emptyBlock) {
                mainElement.style.display = 'none'
                emptyBlock.style.display = 'block'
            }
        } else {
            if (mainElement && emptyBlock) {
                mainElement.style.display = 'block'
                emptyBlock.style.display = 'none'
            }
        }
    }
}