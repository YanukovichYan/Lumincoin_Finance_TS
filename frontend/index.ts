import {Router} from './routes/router'

class Index {
    private router: Router

    constructor() {
        this.router = new Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
    }

    private handleRouteChanging(): void {
        this.router.openRoute();
        this.activeSidebarItem()
    }

    // if (localStorage.getItem(Auth.accessTokenKey) === null) {
    //     location.href = '#/login'
    // }

    private activeSidebarItem(): void {
        let navLinks: NodeListOf<Element> | null = document.querySelectorAll('[data-name="nav"]')
        const currentUrl: string = location.hash.split('/')[1]
        const dropdownButton: HTMLElement | null = document.getElementById('dropdown-button')

        navLinks.forEach(link => {
            if (currentUrl === link.querySelector('a')?.getAttribute('href')?.split('/')[1]) {
                link.classList.add('active')
                dropdownButton?.classList.remove('active')
            } else {
                link.classList.remove('active')
            }

            if (currentUrl === 'income' || currentUrl === 'expense') {
                document.getElementById('dashboard-collapse')?.classList.add('show')
                dropdownButton?.classList.add('btn-primary')
            } else {
                document.getElementById('dashboard-collapse')?.classList.remove('show')
                dropdownButton?.classList.remove('btn-primary')
            }
        })

        if (dropdownButton) {
            dropdownButton.onclick = () => {
                dropdownButton.classList.toggle('active')
                dropdownButton.classList.toggle('rounded')

                if (document.getElementById('dashboard-collapse')?.classList.contains('active')) dropdownButton.classList.add('active')
            }
        }

    }
}

(new Index());