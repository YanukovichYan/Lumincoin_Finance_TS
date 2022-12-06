(() => {
    "use strict";
    const e = {
        host: "http://localhost:3000/api",
        dataBtn: ["Сегодня", "Неделя", "Месяц", "Год", "Все", "Интервал"],
        theadTitle: ["Тип", "Категория", "Сумма", "Дата", "Комментарий", "", ""]
    };

    class t {
        static accessTokenKey = "accessToken";
        static refreshTokenKey = "refreshToken";
        static userInfoKey = "userInfo";

        static setTokens(e, t) {
            localStorage.setItem(this.accessTokenKey, e), localStorage.setItem(this.refreshTokenKey, t)
        }

        static removeTokens() {
            localStorage.removeItem(this.accessTokenKey), localStorage.removeItem(this.refreshTokenKey)
        }

        static setUserInfo(e) {
            localStorage.setItem(this.userInfoKey, JSON.stringify(e))
        }

        static getUserInfo() {
            const e = localStorage.getItem(this.userInfoKey);
            return e ? JSON.parse(e) : null
        }

        static async logout() {
            const a = await fetch(`${e.host}/logout`, {
                method: "POST",
                headers: {"Content-type": "application/json", Accept: "application/json"},
                body: JSON.stringify({refreshToken: localStorage.getItem(this.refreshTokenKey)})
            });
            if (a && 200 === a.status) {
                const e = await a.json();
                if (e && !e.error) return alert("Вы вышли из аккаунта"), this.removeTokens(), localStorage.removeItem(t.userInfoKey), !0
            }
        }

        static async refresh() {
            const t = localStorage.getItem(this.refreshTokenKey);
            if (t) {
                const a = await fetch(`${e.host}/refresh`, {
                    method: "POST",
                    headers: {"Content-type": "application/json", Accept: "application/json"},
                    body: JSON.stringify({refreshToken: t})
                });
                if (a && 200 === a.status) {
                    const e = await a.json();
                    if (e) return this.setTokens(e.tokens.accessToken, e.tokens.refreshToken), !0
                }
            }
            return localStorage.removeItem(this.userInfoKey), this.removeTokens(), location.href = "#/login", !1
        }
    }

    class a {
        static async request(e, a = "GET", s = null) {
            const n = {method: a, headers: {"Content-type": "application/json", Accept: "application/json"}};
            let o = localStorage.getItem(t.accessTokenKey);
            o && (n.headers["x-auth-token"] = o), s && (n.body = JSON.stringify(s));
            const i = await fetch(e, n);
            if (i.status < 200 || i.status >= 300) {
                if (i && i.statusText && console.log(i.statusText), 401 === i.status) return await t.refresh() ? await this.request(e, a, s) : null;
                i.message && console.log(i.message)
            }
            return await i.json()
        }
    }

    class s {
        static async getBalance() {
            if (localStorage.getItem(t.accessTokenKey)) try {
                const t = await a.request(`${e.host}/balance`);
                if (document.getElementById("balance").innerText = `${t.balance}$`, t) return t.balance
            } catch (e) {
                console.log(e)
            }
        }

        static async updateBalance(s) {
            if (localStorage.getItem(t.accessTokenKey)) try {
                const t = await a.request(`${e.host}/balance`, "PUT", {newBalance: s});
                document.getElementById("balance").innerText = `${t.balance}$`
            } catch (e) {
                console.log(e)
            }
        }
    }

    class n {
        static getSeparateCategory(e, t, a) {
            const s = e.reduce(((e, t) => (e[t.category] ? e[t.category].push(t) : e[t.category] = [t], e)), {});
            console.log("categories", a);
            let n = a.find((e => e.id === +t));
            console.log("foundCategory", n), console.log("removeCardId", t), console.log("newObject", s), console.log("IT", s[n.title]);
            let o = 0;
            return s[n.title]?.forEach((e => {
                o += e.amount
            })), console.log("amount", o), o
        }
    }

    class o {
        constructor(e) {
            this.page = e, this.categories = null, this.cardRemoveButton = null, this.removeCardId = null, this.editCardId = null, this.urlParams = null, this.amount = null, "create-income" === this.page ? this.urlParams = "income" : this.urlParams = "expense", "create-income" === this.page || "create-expense" === this.page ? this.create() : this.init()
        }

        async init() {
            try {
                const t = await a.request(`${e.host}/categories/${this.page}`);
                t && (this.categories = t, 0 === t.length && (console.log("Категория пуста!"), document.getElementById("empty-block").style.cssText = "display:block!important"), document.getElementById("card-wrapper").innerHTML = " ", this.showCategories(), await s.getBalance(), this.getOperations())
            } catch (e) {
                console.log(e)
            }
            document.getElementById("create-category").onclick = () => location.href = `#/${this.page}/create-${this.page}`
        }

        showCategories() {
            const e = document.getElementById("card-wrapper");
            this.categories && this.categories.forEach((t => {
                const a = document.createElement("div");
                a.className = "p-3 border border-secondary rounded me-4 mb-3", a.style.cssText = "width: 352px";
                const s = document.createElement("div");
                s.innerText = t.title, s.className = "fs-4 fw-bold pb-2";
                const n = document.createElement("button");
                n.innerText = "Редактировать", n.className = "btn btn-primary me-2", n.setAttribute("data-id", t.id), n.setAttribute("data-name", "edit"), this.cardRemoveButton = document.createElement("button"), this.cardRemoveButton.innerText = "Удалить", this.cardRemoveButton.className = "btn btn-danger", this.cardRemoveButton.setAttribute("data-id", t.id), this.cardRemoveButton.setAttribute("data-bs-target", "#exampleModal"), this.cardRemoveButton.setAttribute("data-bs-toggle", "modal"), a.appendChild(s), a.appendChild(n), a.appendChild(this.cardRemoveButton), e.prepend(a)
            })), this.removeCard(), this.editCard()
        }

        async getOperations() {
            try {
                const t = await a.request(`${e.host}/operations?period=all`);
                t && (this.operations = t)
            } catch (e) {
                console.log(e)
            }
        }

        async create() {
            await s.getBalance(), this.createButton = document.getElementById("create-button"), this.createInput = document.getElementById("create-input"), this.createButton.onclick = () => {
                this.createInput.value, this.createCategoryRequest()
            }, document.getElementById("create-cancel").onclick = () => location.href = `#/${this.urlParams}`
        }

        async createCategoryRequest() {
            try {
                const t = await a.request(`${e.host}/categories/${this.urlParams}`, "POST", {title: this.createInput.value});
                if (t) {
                    if (t.error) throw alert(t.message), new Error(t.message);
                    location.href = `#/${this.urlParams}`
                }
            } catch (e) {
                console.log(e)
            }
        }

        removeCard() {
            document.querySelectorAll(".btn-danger").forEach((e => {
                e.addEventListener("click", (() => {
                    this.removeCardId = e.getAttribute("data-id"), this.removeCategoryAmount()
                }))
            })), document.getElementById("confirm-delete").onclick = () => this.removeCardRequest()
        }

        async removeCategoryAmount() {
            if (this.removeCardId) {
                let e = n.getSeparateCategory(this.operations, this.removeCardId, this.categories);
                const t = await s.getBalance();
                "income" === this.page ? this.amount = t - e : this.amount = t + e, console.log(t), console.log("111", this.amount)
            }
        }

        async removeCardRequest() {
            try {
                const t = await a.request(`${e.host}/categories/${this.page}/${this.removeCardId}`, "DELETE");
                t && (this.init(), await s.updateBalance(this.amount), console.log(t.message))
            } catch (e) {
                console.log(e)
            }
        }

        editCard() {
            document.querySelectorAll('button[data-name="edit"]').forEach((e => {
                e.addEventListener("click", (() => {
                    this.editCardId = e.getAttribute("data-id"), location.href = `#/${this.page}/edit-${this.page}?id=${this.editCardId}`
                }))
            }))
        }
    }

    class i {
        constructor(e) {
            this.page = e, this.editCardId = window.location.hash.split("=")[1], this.editInput = document.getElementById("edit-input"), this.newValueOnInput = null, this.init()
        }

        async init() {
            try {
                const t = await a.request(`${e.host}/categories/${this.page}/${this.editCardId}`);
                t && (this.editInput.value = t.title, await s.getBalance())
            } catch (e) {
                console.log(e)
            }
            this.editInput.onchange = e => this.newValueOnInput = e.target.value, document.getElementById("save-edit-btn").onclick = () => this.saveEdit(), document.getElementById("cancel-btn").onclick = () => location.href = `#/${this.page}`
        }

        async saveEdit() {
            try {
                await a.request(`${e.host}/categories/${this.page}/${this.editCardId}`, "PUT", {title: this.newValueOnInput}) && (location.href = `#/${this.page}`)
            } catch (e) {
                console.log(e)
            }
        }
    }

    class l {
        constructor() {
            this.dateToday = `${(new Date).getFullYear()}-${(new Date).getMonth() + 1}-${(new Date).getDate()}`, this.filterValue = `interval&dateFrom=${this.dateToday}&dateTo=${this.dateToday}`, this.operations = null, this.removeOptionId = null, this.btnEditId = null, this.dateInterval = "", this.btnFilterClick = null, this.optionById = null, this.value = null, this.init()
        }

        init() {
            document.getElementById("create-income").onclick = () => location.href = "#/table-categories/create_income-or-expenses?operations=income", document.getElementById("create-expense").onclick = () => location.href = "#/table-categories/create_income-or-expenses?operations=expense";
            const e = document.getElementById("date-from"), t = document.getElementById("date-to");
            document.getElementById("date-interval").onchange = () => {
                const a = `&dateFrom=${e.value}&dateTo=${t.value}`;
                e.value && t.value && (this.dateInterval = a, this.getDataTable(), console.log(this.dateInterval), console.log("Получили данные, отправляем запрос"))
            }, this.getDataTable(), this.showThead(), this.showFilterBtn()
        }

        async getDataTable() {
            if (await s.getBalance(), "interval" !== this.filterValue || "" !== this.dateInterval) try {
                const t = await a.request(`${e.host}/operations?period=${this.filterValue}${this.dateInterval}`);
                t && (this.operations = t, document.getElementById("tbody").innerHTML = " ", this.showTable()), t.length
            } catch (e) {
                console.log(e)
            }
        }

        showTable() {
            if (this.operations) {
                const e = document.getElementById("tbody");
                this.operations.forEach(((t, a) => {
                    const s = document.createElement("tr"), n = document.createElement("td");
                    n.className = "text-center fw-bold", n.innerText = `${a + 1} `, n.innerText = `${a + 1} `;
                    const o = document.createElement("td");
                    o.className = "income" === t.type ? "text-center text-success" : "text-center text-danger", o.innerText = "income" === t.type ? "доход" : "расход";
                    const i = document.createElement("td");
                    i.className = "text-center", i.innerText = t.category || null;
                    const l = document.createElement("td");
                    l.className = "text-center", l.innerText = `${t.amount} $`;
                    const c = t.date.split("-"), r = document.createElement("td");
                    r.className = "text-center", r.innerText = `${c[2]}.${c[1]}.${c[0]}`;
                    const d = document.createElement("td");
                    d.className = "text-center", d.innerText = t.comment;
                    const h = document.createElement("td");
                    h.className = "text-center", h.setAttribute("role", "button"), h.setAttribute("data-name", "delete"), h.setAttribute("data-id", t.id), h.setAttribute("data-bs-target", "#exampleModal"), h.setAttribute("data-bs-toggle", "modal");
                    const m = document.createElement("img");
                    m.setAttribute("src", "/images/trash-icon.png"), m.setAttribute("alt", "trash"), h.appendChild(m);
                    const u = document.createElement("td");
                    u.className = "text-center", u.setAttribute("role", "button"), u.setAttribute("data-name", "edit"), u.setAttribute("data-id", t.id);
                    const g = document.createElement("img");
                    g.setAttribute("src", "/images/pen-icon.png"), g.setAttribute("alt", "pen"), u.appendChild(g), s.appendChild(n), s.appendChild(o), s.appendChild(i), s.appendChild(l), s.appendChild(r), s.appendChild(d), s.appendChild(h), s.appendChild(u), e.appendChild(s)
                }))
            }
            this.removeOption(), this.edit()
        }

        showThead() {
            e.theadTitle.forEach((e => {
                const t = document.createElement("th");
                t.innerText = e, t.className = "text-center", document.getElementById("thead").appendChild(t)
            }))
        }

        showFilterBtn() {
            let t = !0;
            e.dataBtn.forEach(((e, a) => {
                const s = document.createElement("button");
                s.innerText = e, s.setAttribute("data-name", "filter"), s.className = "btn btn-light border border-secondary me-3 px-3", t && 0 === a && (s.classList.remove("btn-light"), s.classList.add("btn-secondary")), s.addEventListener("click", (() => {
                    t = !1, this.btnFilterClick = s, this.dateInterval = "", document.querySelectorAll('button[data-name="filter"]').forEach((e => {
                        e.classList.add("btn-light"), e.classList.remove("btn-secondary")
                    })), this.btnFilterClick.classList.add("btn-secondary"), this.btnFilterClick.classList.remove("btn-light"), document.getElementById("tbody").innerHTML = " ", this.selectOperationsWithFilter()
                })), document.getElementById("btn-wrapper").appendChild(s)
            }))
        }

        selectOperationsWithFilter() {
            switch (this.btnFilterClick.innerText) {
                case"Сегодня":
                    this.filterValue = `interval&dateFrom=${this.dateToday}&dateTo=${this.dateToday}`;
                    break;
                case"Неделя":
                    this.filterValue = "week";
                    break;
                case"Месяц":
                    this.filterValue = "month";
                    break;
                case"Год":
                    this.filterValue = "year";
                    break;
                case"Все":
                    this.filterValue = "all";
                    break;
                case"Интервал":
                    this.filterValue = "interval"
            }
            this.getDataTable()
        }

        async removeOption() {
            document.querySelectorAll('td[data-name="delete"]').forEach((e => {
                e.addEventListener("click", (() => {
                    this.removeOptionId = e.getAttribute("data-id")
                }))
            })), document.getElementById("confirm-delete").onclick = () => {
                this.getOptionsById(), this.removeOptionRequest()
            }
        }

        async getOptionsById() {
            try {
                const t = await a.request(`${e.host}/operations/${this.removeOptionId}`);
                t && (t.error && alert(t.message), this.optionById = t, console.log("this.optionById", this.optionById))
            } catch (e) {
                console.log(e)
            }
        }

        async removeOptionRequest() {
            const t = await s.getBalance();
            console.log("currentBalance", t), "income" === this.optionById?.type ? this.value = t - this.optionById.amount : this.value = t + this.optionById.amount, console.log(this.value), console.log(this.optionById.amount);
            try {
                const t = await a.request(`${e.host}/operations/${this.removeOptionId}`, "DELETE");
                t && (t.error || (console.log(t.message), await s.updateBalance(this.value), await this.getDataTable()))
            } catch (e) {
                console.log(e)
            }
        }

        edit() {
            document.querySelectorAll('td[data-name="edit"]').forEach((e => {
                e.addEventListener("click", (() => {
                    this.btnEditId = e.getAttribute("data-id"), location.href = `#/table-categories/edit_income-or-expense?id=${this.btnEditId}`
                }))
            }))
        }
    }

    class c {
        constructor(e) {
            this.page = e, this.categories = null, this.createFormValue = null, this.optionById = null, this.optionId = null, this.urlParams = window.location.href.split("=")[1], this.urlSelectType = null, "create" === this.page && (this.urlSelectType = this.urlParams), this.getType = null, this.selectType = document.getElementById("select-type"), this.selectCategory = document.getElementById("select-category"), this.amount = document.getElementById("amount"), this.date = document.getElementById("date"), this.comment = document.getElementById("comment"), this.init()
        }

        init() {
            if ("edit" === this.page) {
                const e = document.getElementById("save");
                e.innerText = "Сохранить", e.onclick = () => this.edit(), document.getElementById("cancel").onclick = () => location.href = "#/table-categories", this.getOperationById()
            }
            this.fillingForm()
        }

        async getOperationById() {
            this.optionId = location.hash.split("=")[1];
            try {
                const t = await a.request(`${e.host}/operations/${this.optionId}`);
                t && (t.error && alert(t.message), this.optionById = t, this.editFormValue())
            } catch (e) {
                console.log(e)
            }
        }

        editFormValue() {
            "income" === this.optionById.type ? this.selectType.selectedIndex = 1 : this.selectType.selectedIndex = 2, "income" === this.optionById.type ? this.getType = "income" : this.getType = "expense", this.urlSelectType = this.getType, this.getCategories(), this.amount.value = this.optionById.amount, this.date.value = this.optionById.date, this.comment.value = this.optionById.comment
        }

        async getCategories() {
            if (this.urlSelectType) try {
                const t = await a.request(`${e.host}/categories/${this.urlSelectType}`);
                t && (this.categories = t, 0 === t.length && console.log("Категорий нет!"), await s.getBalance())
            } catch (e) {
                console.log(e)
            }
            this.showCategoryOptions()
        }

        showCategoryOptions() {
            if (this.categories) {
                const e = document.createElement("option");
                e.innerText = "Категория...", e.setAttribute("hidden", "hidden"), e.setAttribute("selected", "selected"), document.getElementById("select-category").appendChild(e), this.categories.forEach((e => {
                    const t = document.createElement("option");
                    t.innerText = e.title, t.value = e.id, document.getElementById("select-category").appendChild(t)
                })), "edit" === this.page && this.showSelectCategory()
            }
        }

        showSelectCategory() {
            if (this.categories) {
                const e = this.categories.findIndex((e => e.title === this.optionById.category));
                this.selectCategory.selectedIndex = e + 2
            }
        }

        fillingForm() {
            this.getCategories(), "income" === this.urlParams ? this.selectType.selectedIndex = 1 : this.selectType.selectedIndex = 2, this.selectType.onchange = () => {
                this.selectCategory.innerHTML = " ", this.urlSelectType = this.selectType.value, this.getCategories()
            }, document.getElementById("form").onchange = () => {
                this.urlSelectType = this.selectType.value, this.createFormValue = {
                    type: this.selectType.value,
                    amount: +this.amount.value,
                    date: this.date.value,
                    comment: this.comment.value,
                    category_id: +this.selectCategory.value
                }
            }, "create" === this.page && (document.getElementById("save").onclick = () => this.create()), document.getElementById("cancel").onclick = () => location.href = "#/table-categories"
        }

        async create() {
            const t = await s.getBalance();
            console.log("currentBalance", t), "income" === this.selectType.value ? this.value = t + +this.amount.value : this.value = t - +this.amount.value, console.log(+this.amount.value), console.log(this.value);
            try {
                const t = await a.request(`${e.host}/operations`, "POST", this.createFormValue);
                t && (t.error && alert(t.message), t && !t.error && (await s.updateBalance(this.value), await s.getBalance(), location.href = "#/table-categories"))
            } catch (e) {
                console.log(e)
            }
        }

        async edit() {
            try {
                const t = await a.request(`${e.host}/operations/${this.optionId}`, "PUT", this.createFormValue);
                t && (t.error && alert(t.message), location.href = "#/table-categories")
            } catch (e) {
                console.log(e)
            }
        }
    }

    class r {
        constructor() {
            this.chartIncome = document.getElementById("chart-income").getContext("2d"), this.chartExpense = document.getElementById("chart-expense").getContext("2d"), this.dateToday = `${(new Date).getFullYear()}-${(new Date).getMonth() + 1}-${(new Date).getDate()}`, this.filterValue = `interval&dateFrom=${this.dateToday}&dateTo=${this.dateToday}`, this.dateInterval = "", this.btnFilterClick = null, this.categoriesIncome = [], this.categoriesExpense = [], this.operations = [], this.incomeDataAmount = [], this.expenseDataAmount = [], this.myChartIncome = null, this.myChartExpense = null, this.intervalInit()
        }

        intervalInit() {
            const e = document.getElementById("date-from"), t = document.getElementById("date-to");
            document.getElementById("date-interval").onchange = () => {
                const a = `&dateFrom=${e.value}&dateTo=${t.value}`;
                e.value && t.value && (this.dateInterval = a, this.getDataTable(), console.log("this.dateInterval", this.dateInterval), console.log("Получили данные, отправляем запрос"))
            }, this.showFilterBtn(), this.getDataTable()
        }

        async getDataTable() {
            if ("interval" !== this.filterValue || "" !== this.dateInterval) try {
                const t = await a.request(`${e.host}/operations?period=${this.filterValue}${this.dateInterval}`);
                t && (this.operations = t, await s.getBalance(), this.separationCategories())
            } catch (e) {
                console.log(e)
            }
        }

        showFilterBtn() {
            let t = !0;
            e.dataBtn.forEach(((e, a) => {
                const s = document.createElement("button");
                s.innerText = e, s.setAttribute("data-name", "filter"), s.className = "btn btn-light border border-secondary me-3 px-3", t && 0 === a && (s.classList.remove("btn-light"), s.classList.add("btn-secondary")), s.addEventListener("click", (() => {
                    t = !1, this.btnFilterClick = s, this.dateInterval = "", document.querySelectorAll('button[data-name="filter"]').forEach((e => {
                        e.classList.add("btn-light"), e.classList.remove("btn-secondary")
                    })), this.btnFilterClick.classList.add("btn-secondary"), this.btnFilterClick.classList.remove("btn-light"), this.categoriesIncome = [], this.categoriesExpense = [], this.incomeDataAmount = [], this.expenseDataAmount = [], this.selectOperationsWithFilter()
                })), document.getElementById("btn-wrapper").appendChild(s)
            }))
        }

        selectOperationsWithFilter() {
            switch (this.btnFilterClick.innerText) {
                case"Сегодня":
                    this.filterValue = `interval&dateFrom=${this.dateToday}&dateTo=${this.dateToday}`;
                    break;
                case"Неделя":
                    this.filterValue = "week";
                    break;
                case"Месяц":
                    this.filterValue = "month";
                    break;
                case"Год":
                    this.filterValue = "year";
                    break;
                case"Все":
                    this.filterValue = "all";
                    break;
                case"Интервал":
                    this.filterValue = "interval"
            }
            this.getDataTable()
        }

        incomeChartShow() {
            null != this.myChartIncome && this.myChartIncome.destroy(), this.myChartIncome = new Chart(this.chartIncome, {
                type: "pie",
                responsive: !1,
                data: {
                    labels: this.categoriesIncome,
                    datasets: [{
                        data: this.incomeDataAmount,
                        backgroundColor: ["#DC3545", "#20C997", "#0D6EFD", "#FFC107", "#FD7E14"]
                    }]
                },
                options: {responsive: !1, plugins: {}}
            })
        }

        expenseChartShow() {
            null != this.myChartExpense && this.myChartExpense.destroy(), this.myChartExpense = new Chart(this.chartExpense, {
                type: "pie",
                responsive: !1,
                data: {
                    labels: this.categoriesExpense,
                    datasets: [{
                        data: this.expenseDataAmount,
                        backgroundColor: ["#0D6EFD", "#FFC107", "#20C997", "#FD7E14", "#DC3545"]
                    }]
                },
                options: {responsive: !1, plugins: {}}
            })
        }

        separationCategories() {
            const e = this.operations.filter((e => "income" === e.type)),
                t = this.operations.filter((e => "expense" === e.type));
            console.log("incomeOperation", e), console.log("expenseOperation", t);
            const a = e.reduce(((e, t) => (e[t.category] ? e[t.category].push(t) : e[t.category] = [t], e)), {}),
                s = t.reduce(((e, t) => (e[t.category] ? e[t.category].push(t) : e[t.category] = [t], e)), {});
            console.log("newObjectIncome", a), console.log("newObjectExpense", s), console.log("Object.entries(income)", Object.entries(a)), console.log("Object.entries(expense)", Object.entries(s)), Object.entries(a).forEach((e => {
                this.categoriesIncome.push(e[0])
            })), Object.entries(s).forEach((e => {
                this.categoriesExpense.push(e[0])
            })), console.log("this.categoriesIncome", this.categoriesIncome), console.log("this.categoriesExpense", this.categoriesExpense), Object.entries(a).forEach((e => {
                let t = 0;
                e[1].forEach((e => {
                    t += e.amount
                })), this.incomeDataAmount.push(t)
            })), Object.entries(s).forEach((e => {
                let t = 0;
                e[1].forEach((e => {
                    t += e.amount
                })), this.expenseDataAmount.push(t)
            })), console.log("incomeDataAmount", this.incomeDataAmount), console.log("expenseDataAmount", this.expenseDataAmount), this.incomeDataAmount.length && this.incomeChartShow(), this.expenseDataAmount.length && this.expenseChartShow(), 0 === this.incomeDataAmount.length && 0 === this.expenseDataAmount.length ? (document.getElementById("main").style.display = "none", document.getElementById("empty-block").style.display = "block") : (document.getElementById("main").style.display = "block", document.getElementById("empty-block").style.display = "none")
        }
    }

    class d {
        constructor(e) {
            if (this.page = e, this.agreeElement = document.getElementById("agree"), this.processButton = document.getElementById("process"), this.remember = document.getElementById("remember"), localStorage.getItem(t.accessTokenKey)) return void (location.href = "#/main");
            this.fields = [{
                name: "email",
                id: "email",
                element: null,
                regex: /^\S+@\S+\.[a-zA-Z]+$/,
                valid: !1
            }, {
                name: "password",
                id: "password",
                element: null,
                regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                valid: !1
            }], "signup" === this.page && (this.fields.unshift({
                name: "name",
                id: "name",
                element: null,
                regex: /^[А-ЯA-Z][а-яa-z]+\s*[А-ЯA-Z][а-яa-z]+\s*[А-ЯA-Z][а-яa-z]+\s*$/,
                valid: !1
            }), this.fields.push({
                name: "password-repeat",
                id: "password-repeat",
                element: null,
                regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                valid: !1
            })), document.getElementById("eye").onclick = () => {
                !function () {
                    let e = document.getElementById("password");
                    "password" === e.getAttribute("type") ? e.setAttribute("type", "text") : e.setAttribute("type", "password"), setTimeout((() => {
                        e.setAttribute("type", "password")
                    }), 1900)
                }()
            };
            const a = this;
            this.fields.forEach((e => {
                e.element = document.getElementById(e.id), e.element.onchange = function () {
                    a.validateField.call(a, e, this)
                }
            })), this.processButton.onclick = function () {
                a.processSignup()
            }, "signup" === e && (this.agreeElement.onchange = function () {
                a.validateForm()
            })
        }

        validateField(e, t) {
            t.value && t.value.match(e.regex) ? (t.style.borderColor = "#ced4da", e.valid = !0) : (t.style.borderColor = "red", e.valid = !1), this.validateForm()
        }

        validateForm() {
            const e = this.fields.every((e => e.valid));
            let t = null;
            const a = this.fields.find((e => "password" === e.name)).element.value;
            "signup" === this.page && (t = this.fields.find((e => "password-repeat" === e.name)).element.value);
            const s = this.agreeElement ? this.agreeElement.checked && e : e;
            if (s ? this.processButton.removeAttribute("disabled") : this.processButton.setAttribute("disabled", "disabled"), a && t) {
                if (a === t) return s;
                alert("Пароли не совпадают")
            }
        }

        async processSignup() {
            const s = this.fields.find((e => "email" === e.name)).element.value,
                n = this.fields.find((e => "password" === e.name)).element.value;
            if ("signup" === this.page) {
                const t = this.fields.find((e => "name" === e.name)).element.value.split(" ");
                try {
                    const o = await a.request(`${e.host}/signup`, "POST", {
                        name: t[1],
                        lastName: t[0],
                        email: s,
                        password: n,
                        passwordRepeat: this.fields.find((e => "password-repeat" === e.name)).element.value
                    });
                    if (o) {
                        if (o.error) throw console.log(o.message), o.validation[0].message && console.log(o.validation[0].message), new Error(o.message);
                        o.user && (console.log("Registration completed successfully"), window.location.href = "#/main")
                    }
                } catch (e) {
                    return void console.log("Ошибка signup")
                }
            }
            try {
                const o = await a.request(`${e.host}/login`, "POST", {
                    email: s,
                    password: n,
                    rememberMe: this.remember?.checked || !1
                });
                if (o) {
                    if (o.error) throw console.log(o.message), new Error(o.message);
                    t.setTokens(o.tokens.accessToken, o.tokens.refreshToken), t.setUserInfo(o.user), console.log("Вы успешно вошли в аккаунт!"), location.href = "#/main"
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    class h {
        constructor() {
            this.contentElement = document.getElementById("content"), this.pageTitleElement = document.getElementById("page-title"), this.mainTitleElement = document.getElementById("main-title"), this.profileElement = document.getElementById("profile"), this.profileNameElement = document.getElementById("profile-name"), this.routes = [{
                route: "#/signup",
                title: "Регистрация",
                template: "src/templates/auth/signup.html",
                load: () => {
                    new d("signup")
                }
            }, {
                route: "#/login", title: "Вход в систему", template: "src/templates/auth/login.html", load: () => {
                    new d("login")
                }
            }, {
                route: "#/", title: "Главная", template: "src/templates/main/main.html", load: () => {
                    new r
                }
            }, {
                route: "#/income",
                title: "Доходы",
                template: "src/templates/incomes-and-expenses/category.html",
                load: () => {
                    new o("income")
                }
            }, {
                route: "#/income/create-income",
                title: "Создание категории доходов",
                template: "src/templates/incomes-and-expenses/create-category.html",
                load: () => {
                    new o("create-income")
                }
            }, {
                route: "#/income/edit-income",
                title: "Редактирование категории доходов",
                template: "src/templates/incomes-and-expenses/edit-category.html",
                load: () => {
                    new i("income")
                }
            }, {
                route: "#/expense",
                title: "Расходы",
                template: "src/templates/incomes-and-expenses/category.html",
                load: () => {
                    new o("expense")
                }
            }, {
                route: "#/expense/create-expense",
                title: "Создание категории расходов",
                template: "src/templates/incomes-and-expenses/create-category.html",
                load: () => {
                    new o("create-expense")
                }
            }, {
                route: "#/expense/edit-expense",
                title: "Редактирование категории расходов",
                template: "src/templates/incomes-and-expenses/edit-category.html",
                load: () => {
                    new i("expense")
                }
            }, {
                route: "#/table-categories",
                title: "Доходы и расходы",
                template: "src/templates/table-categories/table-categories.html",
                load: () => {
                    new l
                }
            }, {
                route: "#/table-categories/create_income-or-expenses",
                title: "Создание дохода/расхода",
                template: "src/templates/table-categories/form.html",
                load: () => {
                    new c("create")
                }
            }, {
                route: "#/table-categories/edit_income-or-expense",
                title: "Редактирование дохода/расхода",
                template: "src/templates/table-categories/form.html",
                load: () => {
                    new c("edit")
                }
            }]
        }

        async openRoute() {
            const e = window.location.hash.split("?")[0];
            if (null === localStorage.getItem(t.accessTokenKey) && "#/login" !== e && "#/signup" !== e) return console.log("Нет токенов, необходимо войти или зарегистрироваться"), void (window.location.href = "#/login");
            if ("#/logout" === e) return await t.logout(), void (window.location.href = "#/login");
            const a = this.routes.find((t => t.route === e));
            if (!a) return void (window.location.href = "#/");
            this.contentElement.innerHTML = await fetch(a.template).then((e => e.text())), a.load(), this.pageTitleElement.innerText = a.title, this.mainTitleElement.innerText = a.title;
            const s = t.getUserInfo(), n = localStorage.getItem(t.accessTokenKey);
            s && n ? (this.profileElement.style.display = "block", this.profileNameElement.innerText = s.name) : this.profileElement.style.display = "none ", "#/login" === e || "#/signup" === e ? (document.getElementById("sidebar").style.cssText = "display:none!important", document.getElementById("wrapper").style.cssText = "display:block!important", document.getElementById("wrapper-content").style.cssText = "margin:0!important; padding:0!important", this.mainTitleElement.style.cssText = "display:none!important") : (document.getElementById("sidebar").style.cssText = "display:flex!important", document.getElementById("wrapper").style.cssText = "display:flex!important", document.getElementById("wrapper-content").style.cssText = "margin:unset; padding:unset", this.mainTitleElement.style.cssText = "display:block!important")
        }
    }

    new class {
        constructor() {
            this.router = new h, window.addEventListener("DOMContentLoaded", this.handleRouteChanging.bind(this)), window.addEventListener("popstate", this.handleRouteChanging.bind(this))
        }

        handleRouteChanging() {
            this.router.openRoute(), this.activeSidebarItem()
        }

        activeSidebarItem() {
            let e = document.querySelectorAll('[data-name="nav"]');
            const t = location.hash.split("/")[1], a = document.getElementById("dropdown-button");
            e.forEach((e => {
                t === e.querySelector("a").getAttribute("href").split("/")[1] ? (e.classList.add("active"), a.classList.remove("active")) : e.classList.remove("active"), "income" === t || "expense" === t ? (document.getElementById("dashboard-collapse").classList.add("show"), a.classList.add("btn-primary")) : (document.getElementById("dashboard-collapse").classList.remove("show"), a.classList.remove("btn-primary"))
            })), a.onclick = () => {
                a.classList.toggle("active"), a.classList.toggle("rounded"), document.getElementById("dashboard-collapse").classList.contains("active") && a.classList.add("active")
            }
        }
    }
})();