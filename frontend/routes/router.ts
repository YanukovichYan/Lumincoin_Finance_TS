import {Category} from "../src/scripts/incomes-and-expenses/category";
import {Auth} from "../services/auth";
import {Edit} from "../src/scripts/incomes-and-expenses/edit";
import {TableCategories} from "../src/scripts/table-categories/table-categories";
import {Form} from "../src/scripts/table-categories/form";
import {Main} from "../src/scripts/main/main";
import {FormAuth} from "../src/scripts/auth/form-auth";
import {RouteType, UserInfoType} from "../types";

export class Router {

    readonly contentElement: HTMLElement | null
    readonly pageTitleElement: HTMLElement | null
    readonly mainTitleElement: HTMLElement | null
    readonly profileElement: HTMLElement | null
    readonly profileNameElement: HTMLElement | null

    public routes: RouteType[]

    constructor() {
        this.contentElement = document.getElementById('content')
        this.pageTitleElement = document.getElementById('page-title')
        this.mainTitleElement = document.getElementById('main-title')
        this.profileElement = document.getElementById('profile')
        this.profileNameElement = document.getElementById('profile-name')

        this.routes = [
            {
                route: '#/signup',
                title: 'Регистрация',
                template: '/templates/auth/signup.html',
                load: () => {
                    new FormAuth('signup');
                }
            },
            {
                route: '#/login',
                title: 'Вход в систему',
                template: '/templates/auth/login.html',
                load: () => {
                    new FormAuth('login');
                }
            },
            {
                route: '#/',
                title: 'Главная',
                template: '/templates/main/main.html',
                load: () => {
                    new Main()
                }
            },
            {
                route: '#/income',
                title: 'Доходы',
                template: '/templates/incomes-and-expenses/category.html',
                load: () => {
                    new Category('income');
                }
            },
            {
                route: '#/income/create-income',
                title: 'Создание категории доходов',
                template: '/templates/incomes-and-expenses/create-category.html',
                load: () => {
                    new Category('create-income');
                }
            },
            {
                route: '#/income/edit-income',
                title: 'Редактирование категории доходов',
                template: '/templates/incomes-and-expenses/edit-category.html',
                load: () => {
                    new Edit('income');
                }
            },
            {
                route: '#/expense',
                title: 'Расходы',
                template: '/templates/incomes-and-expenses/category.html',
                load: () => {
                    new Category('expense');
                }
            },
            {
                route: '#/expense/create-expense',
                title: 'Создание категории расходов',
                template: '/templates/incomes-and-expenses/create-category.html',
                load: () => {
                    new Category('create-expense');
                }
            },
            {
                route: '#/expense/edit-expense',
                title: 'Редактирование категории расходов',
                template: '/templates/incomes-and-expenses/edit-category.html',
                load: () => {
                    new Edit('expense');
                }
            },
            {
                route: '#/table-categories',
                title: 'Доходы и расходы',
                template: '/templates/table-categories/table-categories.html',
                load: () => {
                    new TableCategories();
                }
            },
            {
                route: '#/table-categories/create_income-or-expenses',
                title: 'Создание дохода/расхода',
                template: '/templates/table-categories/form.html',
                load: () => {
                    new Form('create');
                }
            },
            {
                route: '#/table-categories/edit_income-or-expense',
                title: 'Редактирование дохода/расхода',
                template: '/templates/table-categories/form.html',
                load: () => {
                    new Form('edit');
                }
            },
        ]
    }


    public async openRoute(): Promise<void> {
        const urlRoute: string = window.location.hash.split('?')[0]

        let accessTokenKey: string | null = localStorage.getItem(Auth.accessTokenKey)

        if (accessTokenKey === null && urlRoute !== '#/login' && urlRoute !== '#/signup') {
            console.log('Нет токенов, необходимо войти или зарегистрироваться')
            window.location.href = '#/login'
            return
        }

        if (urlRoute === '#/logout') {
            const result: boolean = await Auth.logout()
            if (result) {
                window.location.href = '#/login'
                return
            }
        }

        const newRoute: RouteType | undefined = this.routes.find((item: RouteType) => {
            return item.route === urlRoute
        });


        if (!newRoute) {
            window.location.href = '#/'
            return
        }

        if (this.contentElement) {
            this.contentElement.innerHTML =
                await fetch(newRoute.template).then(response => response.text())
        }

        newRoute.load()

        if (this.pageTitleElement) {
            this.pageTitleElement.innerText = newRoute.title
        }

        if (this.mainTitleElement) {
            this.mainTitleElement.innerText = newRoute.title
        }


        const userInfo: UserInfoType | null = Auth.getUserInfo()
        const accessToken: string | null = localStorage.getItem(Auth.accessTokenKey)

        if (this.profileElement && this.profileNameElement) {
            if (userInfo && accessToken) {
                this.profileElement.style.display = 'block'
                this.profileNameElement.innerText = userInfo.name
            } else {
                this.profileElement.style.display = 'none '
            }
        }

        const sidebarElement = document.getElementById('sidebar')
        const wrapperElement = document.getElementById('wrapper')
        const wrapperContentElement = document.getElementById('wrapper-content')

        if (sidebarElement && wrapperElement && wrapperContentElement && this.mainTitleElement) {
            if (urlRoute === '#/login' || urlRoute === '#/signup') {
                sidebarElement.style.cssText = 'display:none!important'
                wrapperElement.style.cssText = 'display:block!important'
                wrapperContentElement.style.cssText = `margin:0!important; padding:0!important`
                this.mainTitleElement.style.cssText = 'display:none!important'
            } else {
                sidebarElement.style.cssText = 'display:flex!important'
                wrapperElement.style.cssText = 'display:flex!important'
                wrapperContentElement.style.cssText = `margin:unset; padding:unset`
                this.mainTitleElement.style.cssText = 'display:block!important'
            }
        }
    }
}