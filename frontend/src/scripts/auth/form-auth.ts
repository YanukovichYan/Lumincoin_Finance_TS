import {CustomHttp} from "../../../services/custom-http";
import config from "../../../config/config";
import {Auth} from "../../../services/auth";
import {DefaultResponseType, FieldsType, LoginResponseType, SignupResponseType} from "../../../types";

export class FormAuth {

    readonly page: 'signup' | 'login'
    readonly agreeElement: HTMLElement | null
    readonly processButton: HTMLElement | null
    private remember: HTMLElement | null
    private fields: FieldsType[] = []

    constructor(page: 'signup' | 'login') {
        this.page = page
        this.agreeElement = document.getElementById('agree')
        this.processButton = document.getElementById('process')
        this.remember = document.getElementById('remember')

        if (localStorage.getItem(Auth.accessTokenKey)) {
            location.href = '#/main'
            return
        }

        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\S+@\S+\.[a-zA-Z]+$/,
                valid: false
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                valid: false
            },
        ];

        if (this.page === "signup") {
            this.fields.unshift(
                {
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[А-ЯA-Z][а-яa-z]+\s*[А-ЯA-Z][а-яa-z]+\s*[А-ЯA-Z][а-яa-z]+\s*$/,
                    valid: false
                }
            )
            this.fields.push(
                {
                    name: 'password-repeat',
                    id: 'password-repeat',
                    element: null,
                    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    valid: false
                }
            )
        }

        const eyeElement: HTMLElement | null = document.getElementById('eye')

        if (eyeElement) {
            eyeElement.onclick = () => {
                viewPassword()
            }
        }


        function viewPassword(): void {
            let inputPassword = document.getElementById("password");
            if (inputPassword) {
                if (inputPassword.getAttribute('type') === 'password') {
                    inputPassword.setAttribute('type', 'text')
                } else {
                    inputPassword.setAttribute('type', 'password')
                }
            }

            setTimeout(() => {
                if (inputPassword) {
                    inputPassword.setAttribute('type', 'password')
                }
            }, 1900)
        }

        const that: FormAuth = this;

        this.fields.forEach((item: FieldsType) => {
            item.element = document.getElementById(item.id) as HTMLInputElement

            if (item.element) {
                item.element.onchange = function () {
                    that.validateField.call(that, item, <HTMLInputElement>this)
                }
            }
        })

        if (this.processButton) {
            this.processButton.onclick = function () {
                that.processSignup()
            }
        }


        if (page === 'signup') {
            if (this.agreeElement) {
                this.agreeElement.onchange = function () {
                    that.validateForm()
                }
            }
        }
    }

    private validateField(field: FieldsType, element: HTMLInputElement): void {
        if (!element.value || !element.value.match(field.regex)) {
            element.style.borderColor = 'red'
            field.valid = false
        } else {
            element.style.borderColor = '#ced4da'
            field.valid = true
        }

        this.validateForm()
    }

    private validateForm(): boolean {
        const validForm: boolean = this.fields.every((item) => item.valid)

        let passwordRepeat: string | undefined

        const password = this.fields.find(item => item.name === 'password')?.element?.value
        if (this.page === 'signup') {
            passwordRepeat = this.fields.find(item => item.name === 'password-repeat')?.element?.value
        }


        const isValid: boolean = this.agreeElement ? (this.agreeElement as HTMLInputElement).checked && validForm : validForm

        if (this.processButton) {
            if (isValid) {
                this.processButton.removeAttribute('disabled')
            } else {
                this.processButton.setAttribute('disabled', 'disabled')
            }
        }

        if (password && passwordRepeat) {
            if (password === passwordRepeat) {
                return isValid
            } else {
                alert('Пароли не совпадают')
            }
        }
        return false
    }

    private async processSignup(): Promise<void> {

        const email = this.fields.find(item => item.name === 'email')?.element?.value
        const password = this.fields.find(item => item.name === 'password')?.element?.value

        if (this.page === 'signup') {
            const fio = this.fields.find(item => item.name === 'name')?.element?.value
            const arrFio: string[] | null = fio ? fio?.split(' ') : null

            if (arrFio) {
                try {
                    const result: SignupResponseType | DefaultResponseType = await CustomHttp.request(`${config.host}/signup`, 'POST', {
                        name: arrFio[1],
                        lastName: arrFio[0],
                        email: email,
                        password: password,
                        passwordRepeat: this.fields.find(item => item.name === 'password-repeat')?.element?.value
                    })

                    if ((result as DefaultResponseType)) {
                        if ((result as DefaultResponseType).error) {
                            console.log((result as DefaultResponseType).message)
                            if ((result as DefaultResponseType) && (result as DefaultResponseType).validation) {
                                // @ts-ignore
                                console.log((result as DefaultResponseType).validation[0].message)
                            }

                            if ((result as DefaultResponseType)) {
                                throw new Error((result as DefaultResponseType).message)

                            }
                        } else if ((result as SignupResponseType).user) {
                            console.log('Registration completed successfully')
                            window.location.href = "#/main"
                        }
                    }
                } catch (e) {
                    console.log("Ошибка signup")
                    return
                }
        }
        }
        try {
            const result: LoginResponseType | DefaultResponseType = await CustomHttp.request(`${config.host}/login`, 'POST', {
                email: email,
                password: password,
                rememberMe: (this.remember as HTMLInputElement)?.checked || false
            })

            if (result) {
                if ((result as DefaultResponseType).error) {
                    console.log((result as DefaultResponseType).message)
                    throw new Error((result as DefaultResponseType).message)
                }
                Auth.setTokens((result as LoginResponseType).tokens.accessToken, (result as LoginResponseType).tokens.refreshToken)
                Auth.setUserInfo((result as LoginResponseType).user)
                console.log("Вы успешно вошли в аккаунт!")
                location.href = '#/main'
            }

        } catch (e) {
            console.log(e)
        }
    }
}