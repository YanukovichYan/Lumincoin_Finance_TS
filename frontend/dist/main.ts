/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.ts":
/*!**************************!*\
  !*** ./config/config.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    host: 'http://localhost:3000/api',
    dataBtn: ['Сегодня', 'Неделя', 'Месяц', 'Год', 'Все', 'Интервал'],
    theadTitle: ['Тип', 'Категория', 'Сумма', 'Дата', 'Комментарий', '', ''],
};


/***/ }),

/***/ "./routes/router.ts":
/*!**************************!*\
  !*** ./routes/router.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Router = void 0;
var category_ts_1 = __webpack_require__(/*! ../src/scripts/incomes-and-expenses/category.ts */ "./src/scripts/incomes-and-expenses/category.ts");
var auth_ts_1 = __webpack_require__(/*! ../services/auth.ts */ "./services/auth.ts");
var edit_ts_1 = __webpack_require__(/*! ../src/scripts/incomes-and-expenses/edit.ts */ "./src/scripts/incomes-and-expenses/edit.ts");
var table_categories_ts_1 = __webpack_require__(/*! ../src/scripts/table-categories/table-categories.ts */ "./src/scripts/table-categories/table-categories.ts");
var form_ts_1 = __webpack_require__(/*! ../src/scripts/table-categories/form.ts */ "./src/scripts/table-categories/form.ts");
var main_ts_1 = __webpack_require__(/*! ../src/scripts/main/main.ts */ "./src/scripts/main/main.ts");
var form_auth_ts_1 = __webpack_require__(/*! ../src/scripts/auth/form-auth.ts */ "./src/scripts/auth/form-auth.ts");
var Router = /** @class */ (function () {
    function Router() {
        this.contentElement = document.getElementById('content');
        this.pageTitleElement = document.getElementById('page-title');
        this.mainTitleElement = document.getElementById('main-title');
        this.profileElement = document.getElementById('profile');
        this.profileNameElement = document.getElementById('profile-name');
        this.routes = [
            {
                route: '#/signup',
                title: 'Регистрация',
                template: '/templates/auth/signup.html',
                load: function () {
                    new form_auth_ts_1.FormAuth('signup');
                }
            },
            {
                route: '#/login',
                title: 'Вход в систему',
                template: '/templates/auth/login.html',
                load: function () {
                    new form_auth_ts_1.FormAuth('login');
                }
            },
            {
                route: '#/',
                title: 'Главная',
                template: '/templates/main/main.html',
                load: function () {
                    new main_ts_1.Main();
                }
            },
            {
                route: '#/income',
                title: 'Доходы',
                template: '/templates/incomes-and-expenses/category.html',
                load: function () {
                    new category_ts_1.Category('income');
                }
            },
            {
                route: '#/income/create-income',
                title: 'Создание категории доходов',
                template: '/templates/incomes-and-expenses/create-category.html',
                load: function () {
                    new category_ts_1.Category('create-income');
                }
            },
            {
                route: '#/income/edit-income',
                title: 'Редактирование категории доходов',
                template: '/templates/incomes-and-expenses/edit-category.html',
                load: function () {
                    new edit_ts_1.Edit('income');
                }
            },
            {
                route: '#/expense',
                title: 'Расходы',
                template: '/templates/incomes-and-expenses/category.html',
                load: function () {
                    new category_ts_1.Category('expense');
                }
            },
            {
                route: '#/expense/create-expense',
                title: 'Создание категории расходов',
                template: '/templates/incomes-and-expenses/create-category.html',
                load: function () {
                    new category_ts_1.Category('create-expense');
                }
            },
            {
                route: '#/expense/edit-expense',
                title: 'Редактирование категории расходов',
                template: '/templates/incomes-and-expenses/edit-category.html',
                load: function () {
                    new edit_ts_1.Edit('expense');
                }
            },
            {
                route: '#/table-categories',
                title: 'Доходы и расходы',
                template: '/templates/table-categories/table-categories.html',
                load: function () {
                    new table_categories_ts_1.TableCategories();
                }
            },
            {
                route: '#/table-categories/create_income-or-expenses',
                title: 'Создание дохода/расхода',
                template: '/templates/table-categories/form.html',
                load: function () {
                    new form_ts_1.Form('create');
                }
            },
            {
                route: '#/table-categories/edit_income-or-expense',
                title: 'Редактирование дохода/расхода',
                template: '/templates/table-categories/form.html',
                load: function () {
                    new form_ts_1.Form('edit');
                }
            },
        ];
    }
    Router.prototype.openRoute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var urlRoute, accessTokenKey, newRoute, _a, userInfo, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        urlRoute = window.location.hash.split('?')[0];
                        accessTokenKey = localStorage.getItem(auth_ts_1.Auth.accessTokenKey);
                        if (accessTokenKey === null && urlRoute !== '#/login' && urlRoute !== '#/signup') {
                            console.log('Нет токенов, необходимо войти или зарегистрироваться');
                            window.location.href = '#/login';
                            return [2 /*return*/];
                        }
                        if (!(urlRoute === '#/logout')) return [3 /*break*/, 2];
                        return [4 /*yield*/, auth_ts_1.Auth.logout()];
                    case 1:
                        _b.sent();
                        window.location.href = '#/login';
                        return [2 /*return*/];
                    case 2:
                        newRoute = this.routes.find(function (item) {
                            return item.route === urlRoute;
                        });
                        if (!newRoute) {
                            window.location.href = '#/';
                            return [2 /*return*/];
                        }
                        _a = this.contentElement;
                        return [4 /*yield*/, fetch(newRoute.template).then(function (response) { return response.text(); })];
                    case 3:
                        _a.innerHTML =
                            _b.sent();
                        newRoute.load();
                        this.pageTitleElement.innerText = newRoute.title;
                        this.mainTitleElement.innerText = newRoute.title;
                        userInfo = auth_ts_1.Auth.getUserInfo();
                        accessToken = localStorage.getItem(auth_ts_1.Auth.accessTokenKey);
                        if (userInfo && accessToken) {
                            this.profileElement.style.display = 'block';
                            this.profileNameElement.innerText = userInfo.name;
                        }
                        else {
                            this.profileElement.style.display = 'none ';
                        }
                        if (urlRoute === '#/login' || urlRoute === '#/signup') {
                            document.getElementById('sidebar').style.cssText = 'display:none!important';
                            document.getElementById('wrapper').style.cssText = 'display:block!important';
                            document.getElementById('wrapper-content').style.cssText = "margin:0!important; padding:0!important";
                            this.mainTitleElement.style.cssText = 'display:none!important';
                        }
                        else {
                            document.getElementById('sidebar').style.cssText = 'display:flex!important';
                            document.getElementById('wrapper').style.cssText = 'display:flex!important';
                            document.getElementById('wrapper-content').style.cssText = "margin:unset; padding:unset";
                            this.mainTitleElement.style.cssText = 'display:block!important';
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Router;
}());
exports.Router = Router;


/***/ }),

/***/ "./services/auth.ts":
/*!**************************!*\
  !*** ./services/auth.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth = void 0;
var config_1 = __importDefault(__webpack_require__(/*! ../config/config */ "./config/config.ts"));
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.setTokens = function (accessToken, refreshToken) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    };
    Auth.removeTokens = function () {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    };
    Auth.setUserInfo = function (user) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(user));
    };
    Auth.getUserInfo = function () {
        var userInfo = localStorage.getItem(this.userInfoKey);
        return userInfo ? JSON.parse(userInfo) : null;
    };
    Auth.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(config_1.default.host, "/logout"), {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({ refreshToken: localStorage.getItem(this.refreshTokenKey) })
                        })];
                    case 1:
                        response = _a.sent();
                        if (!(response && response.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        if (result && !result.error) {
                            alert("Вы вышли из аккаунта");
                            this.removeTokens();
                            localStorage.removeItem(Auth.userInfoKey);
                            return [2 /*return*/, true];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Auth.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = localStorage.getItem(this.refreshTokenKey);
                        if (!refreshToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch("".concat(config_1.default.host, "/refresh"), {
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify({ refreshToken: refreshToken })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response && response.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()
                            // console.log(result)
                        ];
                    case 2:
                        result = _a.sent();
                        // console.log(result)
                        if (result) {
                            // console.log("Записываю в localStorage", result)
                            this.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
                            return [2 /*return*/, true];
                        }
                        _a.label = 3;
                    case 3:
                        localStorage.removeItem(this.userInfoKey);
                        this.removeTokens();
                        location.href = '#/login';
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Auth.accessTokenKey = 'accessToken';
    Auth.refreshTokenKey = 'refreshToken';
    Auth.userInfoKey = 'userInfo';
    return Auth;
}());
exports.Auth = Auth;


/***/ }),

/***/ "./services/custom-http.ts":
/*!*********************************!*\
  !*** ./services/custom-http.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomHttp = void 0;
var auth_ts_1 = __webpack_require__(/*! ./auth.ts */ "./services/auth.ts");
var CustomHttp = /** @class */ (function () {
    function CustomHttp() {
    }
    CustomHttp.request = function (url, method, body) {
        if (method === void 0) { method = 'GET'; }
        if (body === void 0) { body = null; }
        return __awaiter(this, void 0, void 0, function () {
            var params, token, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            method: method,
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json'
                            }
                        };
                        token = localStorage.getItem(auth_ts_1.Auth.accessTokenKey);
                        if (token)
                            params.headers['x-auth-token'] = token;
                        if (body)
                            params.body = JSON.stringify(body);
                        return [4 /*yield*/, fetch(url, params)];
                    case 1:
                        response = _a.sent();
                        if (!(response.status < 200 || response.status >= 300)) return [3 /*break*/, 6];
                        // console.log("response", response)
                        if (response) {
                            if (response.statusText) {
                                console.log(response.statusText);
                            }
                        }
                        if (!(response.status === 401)) return [3 /*break*/, 5];
                        return [4 /*yield*/, auth_ts_1.Auth.refresh()
                            // console.log('result-refresh', result)
                        ];
                    case 2:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.request(url, method, body)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, null];
                    case 5:
                        if (response.message) {
                            console.log(response.message);
                        }
                        _a.label = 6;
                    case 6: return [4 /*yield*/, response.json()];
                    case 7: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CustomHttp;
}());
exports.CustomHttp = CustomHttp;


/***/ }),

/***/ "./services/separationCategories.ts":
/*!******************************************!*\
  !*** ./services/separationCategories.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeparationCategories = void 0;
var SeparationCategories = /** @class */ (function () {
    function SeparationCategories() {
    }
    SeparationCategories.getSeparateCategory = function (operations, removeCardId, categories) {
        var _a;
        var newObject = operations.reduce(function (object, operation) {
            if (object[operation.category]) {
                object[operation.category].push(operation);
            }
            else {
                object[operation.category] = [operation];
            }
            return object;
        }, {});
        console.log('categories', categories);
        var foundCategory = categories.find(function (category) { return category.id === +(removeCardId); });
        console.log('foundCategory', foundCategory);
        console.log('removeCardId', removeCardId);
        console.log('newObject', newObject);
        console.log('IT', newObject[foundCategory.title]);
        var amount = 0;
        (_a = newObject[foundCategory.title]) === null || _a === void 0 ? void 0 : _a.forEach(function (el) {
            amount += el.amount;
        });
        console.log('amount', amount);
        // console.log('Object.entries(income)', Object.entries(newObject))
        return amount;
    };
    return SeparationCategories;
}());
exports.SeparationCategories = SeparationCategories;


/***/ }),

/***/ "./src/scripts/auth/form-auth.ts":
/*!***************************************!*\
  !*** ./src/scripts/auth/form-auth.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormAuth = void 0;
var custom_http_1 = __webpack_require__(/*! ../../../services/custom-http */ "./services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../../config/config */ "./config/config.ts"));
var auth_1 = __webpack_require__(/*! ../../../services/auth */ "./services/auth.ts");
var FormAuth = /** @class */ (function () {
    function FormAuth(page) {
        this.page = page;
        this.agreeElement = document.getElementById('agree');
        this.processButton = document.getElementById('process');
        this.remember = document.getElementById('remember');
        if (localStorage.getItem(auth_1.Auth.accessTokenKey)) {
            location.href = '#/main';
            return;
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
            this.fields.unshift({
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[А-ЯA-Z][а-яa-z]+\s*[А-ЯA-Z][а-яa-z]+\s*[А-ЯA-Z][а-яa-z]+\s*$/,
                valid: false
            });
            this.fields.push({
                name: 'password-repeat',
                id: 'password-repeat',
                element: null,
                regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                valid: false
            });
        }
        document.getElementById('eye').onclick = function () {
            viewPassword();
        };
        function viewPassword() {
            var inputPassword = document.getElementById("password");
            if (inputPassword.getAttribute('type') === 'password') {
                inputPassword.setAttribute('type', 'text');
            }
            else {
                inputPassword.setAttribute('type', 'password');
            }
            setTimeout(function () {
                inputPassword.setAttribute('type', 'password');
            }, 1900);
        }
        var that = this;
        this.fields.forEach(function (item) {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            };
        });
        this.processButton.onclick = function () {
            that.processSignup();
        };
        if (page === 'signup') {
            this.agreeElement.onchange = function () {
                that.validateForm();
            };
        }
    }
    FormAuth.prototype.validateField = function (field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.style.borderColor = 'red';
            field.valid = false;
        }
        else {
            element.style.borderColor = '#ced4da';
            field.valid = true;
        }
        this.validateForm();
    };
    FormAuth.prototype.validateForm = function () {
        var validForm = this.fields.every(function (item) { return item.valid; });
        var passwordRepeat = null;
        var password = this.fields.find(function (item) { return item.name === 'password'; }).element.value;
        if (this.page === 'signup') {
            passwordRepeat = this.fields.find(function (item) { return item.name === 'password-repeat'; }).element.value;
        }
        var isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        if (isValid) {
            this.processButton.removeAttribute('disabled');
        }
        else {
            this.processButton.setAttribute('disabled', 'disabled');
        }
        if (password && passwordRepeat) {
            if (password === passwordRepeat) {
                return isValid;
            }
            else {
                alert('Пароли не совпадают');
            }
        }
    };
    FormAuth.prototype.processSignup = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var email, password, fio, arrFio, result, e_1, result, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = this.fields.find(function (item) { return item.name === 'email'; }).element.value;
                        password = this.fields.find(function (item) { return item.name === 'password'; }).element.value;
                        if (!(this.page === 'signup')) return [3 /*break*/, 4];
                        fio = this.fields.find(function (item) { return item.name === 'name'; }).element.value;
                        arrFio = fio.split(' ');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/signup"), 'POST', {
                                name: arrFio[1],
                                lastName: arrFio[0],
                                email: email,
                                password: password,
                                passwordRepeat: this.fields.find(function (item) { return item.name === 'password-repeat'; }).element.value
                            })];
                    case 2:
                        result = _b.sent();
                        if (result) {
                            if (result.error) {
                                console.log(result.message);
                                if (result.validation[0].message) {
                                    console.log(result.validation[0].message);
                                }
                                throw new Error(result.message);
                            }
                            else if (result.user) {
                                console.log('Registration completed successfully');
                                window.location.href = "#/main";
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        console.log("Ошибка signup");
                        return [2 /*return*/];
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/login"), 'POST', {
                                email: email,
                                password: password,
                                rememberMe: ((_a = this.remember) === null || _a === void 0 ? void 0 : _a.checked) || false
                            })];
                    case 5:
                        result = _b.sent();
                        if (result) {
                            if (result.error) {
                                console.log(result.message);
                                throw new Error(result.message);
                            }
                            auth_1.Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
                            auth_1.Auth.setUserInfo(result.user);
                            console.log("Вы успешно вошли в аккаунт!");
                            location.href = '#/main';
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        e_2 = _b.sent();
                        console.log(e_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return FormAuth;
}());
exports.FormAuth = FormAuth;


/***/ }),

/***/ "./src/scripts/incomes-and-expenses/category.ts":
/*!******************************************************!*\
  !*** ./src/scripts/incomes-and-expenses/category.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = void 0;
var custom_http_1 = __webpack_require__(/*! ../../../services/custom-http */ "./services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../../config/config */ "./config/config.ts"));
var sidebar_1 = __webpack_require__(/*! ../sidebar */ "./src/scripts/sidebar.ts");
var separationCategories_1 = __webpack_require__(/*! ../../../services/separationCategories */ "./services/separationCategories.ts");
var Category = /** @class */ (function () {
    function Category(page) {
        this.page = page;
        this.categories = null;
        this.cardRemoveButton = null;
        this.removeCardId = null;
        this.editCardId = null;
        this.urlParams = null;
        this.amount = null;
        this.page === "create-income" ? this.urlParams = 'income' : this.urlParams = 'expense';
        this.page === 'create-income' || this.page === 'create-expense' ? this.create() : this.init();
    }
    Category.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/categories/").concat(this.page))];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 3];
                        this.categories = result;
                        if (result.length === 0) {
                            console.log('Категория пуста!');
                            document.getElementById('empty-block').style.cssText = 'display:block!important';
                        }
                        document.getElementById('card-wrapper').innerHTML = ' ';
                        this.showCategories();
                        return [4 /*yield*/, sidebar_1.Sidebar.getBalance()];
                    case 2:
                        _a.sent();
                        this.getOperations();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 5];
                    case 5:
                        document.getElementById('create-category').onclick = function () { return location.href = "#/".concat(_this.page, "/create-").concat(_this.page); };
                        return [2 /*return*/];
                }
            });
        });
    };
    Category.prototype.showCategories = function () {
        var _this = this;
        var cardWrapper = document.getElementById('card-wrapper');
        if (this.categories) {
            this.categories.forEach(function (category) {
                var card = document.createElement('div');
                card.className = "p-3 border border-secondary rounded me-4 mb-3";
                card.style.cssText = "width: 352px";
                var cardTitle = document.createElement('div');
                cardTitle.innerText = category.title;
                cardTitle.className = "fs-4 fw-bold pb-2";
                var cardEditButton = document.createElement('button');
                cardEditButton.innerText = "Редактировать";
                cardEditButton.className = "btn btn-primary me-2";
                cardEditButton.setAttribute('data-id', category.id);
                cardEditButton.setAttribute('data-name', "edit");
                _this.cardRemoveButton = document.createElement('button');
                _this.cardRemoveButton.innerText = "Удалить";
                _this.cardRemoveButton.className = "btn btn-danger";
                _this.cardRemoveButton.setAttribute('data-id', category.id);
                _this.cardRemoveButton.setAttribute('data-bs-target', "#exampleModal");
                _this.cardRemoveButton.setAttribute('data-bs-toggle', "modal");
                card.appendChild(cardTitle);
                card.appendChild(cardEditButton);
                card.appendChild(_this.cardRemoveButton);
                cardWrapper.prepend(card);
            });
        }
        this.removeCard();
        this.editCard();
    };
    Category.prototype.getOperations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/operations?period=all"))];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            this.operations = result;
                            // await Sidebar.getBalance()
                            // console.log('this.operations', this.operations)
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Category.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sidebar_1.Sidebar.getBalance()];
                    case 1:
                        _a.sent();
                        this.createButton = document.getElementById('create-button');
                        this.createInput = document.getElementById('create-input');
                        this.createButton.onclick = function () {
                            _this.createInput.value;
                            _this.createCategoryRequest();
                        };
                        document.getElementById('create-cancel').onclick = function () { return location.href = "#/".concat(_this.urlParams); };
                        return [2 /*return*/];
                }
            });
        });
    };
    Category.prototype.createCategoryRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/categories/").concat(this.urlParams), "POST", {
                                title: this.createInput.value
                            })];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            if (result.error) {
                                alert(result.message);
                                throw new Error(result.message);
                            }
                            location.href = "#/".concat(this.urlParams);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Category.prototype.removeCard = function () {
        var _this = this;
        var removeButtons = document.querySelectorAll('.btn-danger');
        removeButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                _this.removeCardId = btn.getAttribute('data-id');
                _this.removeCategoryAmount();
            });
        });
        document.getElementById('confirm-delete').onclick = function () { return _this.removeCardRequest(); };
    };
    Category.prototype.removeCategoryAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var amount, currentBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.removeCardId) return [3 /*break*/, 2];
                        amount = separationCategories_1.SeparationCategories.getSeparateCategory(this.operations, this.removeCardId, this.categories);
                        return [4 /*yield*/, sidebar_1.Sidebar.getBalance()];
                    case 1:
                        currentBalance = _a.sent();
                        if (this.page === 'income') {
                            this.amount = currentBalance - amount;
                        }
                        else {
                            this.amount = currentBalance + amount;
                        }
                        console.log(currentBalance);
                        console.log('111', this.amount);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Category.prototype.removeCardRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/categories/").concat(this.page, "/").concat(this.removeCardId), 'DELETE')];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 3];
                        this.init();
                        return [4 /*yield*/, sidebar_1.Sidebar.updateBalance(this.amount)];
                    case 2:
                        _a.sent();
                        console.log(result.message);
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_4 = _a.sent();
                        console.log(e_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Category.prototype.editCard = function () {
        var _this = this;
        var editButtons = document.querySelectorAll('button[data-name="edit"]');
        editButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                _this.editCardId = btn.getAttribute('data-id');
                location.href = "#/".concat(_this.page, "/edit-").concat(_this.page, "?id=").concat(_this.editCardId);
            });
        });
    };
    return Category;
}());
exports.Category = Category;


/***/ }),

/***/ "./src/scripts/incomes-and-expenses/edit.ts":
/*!**************************************************!*\
  !*** ./src/scripts/incomes-and-expenses/edit.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Edit = void 0;
var custom_http_1 = __webpack_require__(/*! ../../../services/custom-http */ "./services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../../config/config */ "./config/config.ts"));
var sidebar_1 = __webpack_require__(/*! ../sidebar */ "./src/scripts/sidebar.ts");
var Edit = /** @class */ (function () {
    function Edit(page) {
        this.page = page;
        this.editCardId = window.location.hash.split('=')[1];
        this.editInput = document.getElementById('edit-input');
        this.newValueOnInput = null;
        this.init();
    }
    Edit.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/categories/").concat(this.page, "/").concat(this.editCardId))];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 3];
                        this.editInput.value = result.title;
                        return [4 /*yield*/, sidebar_1.Sidebar.getBalance()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 5];
                    case 5:
                        this.editInput.onchange = function (e) { return _this.newValueOnInput = e.target.value; };
                        document.getElementById('save-edit-btn').onclick = function () { return _this.saveEdit(); };
                        document.getElementById('cancel-btn').onclick = function () { return location.href = "#/".concat(_this.page); };
                        return [2 /*return*/];
                }
            });
        });
    };
    Edit.prototype.saveEdit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/categories/").concat(this.page, "/").concat(this.editCardId), 'PUT', {
                                title: this.newValueOnInput
                            })];
                    case 1:
                        result = _a.sent();
                        if (result)
                            location.href = "#/".concat(this.page);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Edit;
}());
exports.Edit = Edit;


/***/ }),

/***/ "./src/scripts/main/main.ts":
/*!**********************************!*\
  !*** ./src/scripts/main/main.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Main = void 0;
var config_1 = __importDefault(__webpack_require__(/*! ../../../config/config */ "./config/config.ts"));
var custom_http_1 = __webpack_require__(/*! ../../../services/custom-http */ "./services/custom-http.ts");
var sidebar_1 = __webpack_require__(/*! ../sidebar */ "./src/scripts/sidebar.ts");
var Main = /** @class */ (function () {
    function Main() {
        this.chartIncome = document.getElementById('chart-income').getContext('2d');
        this.chartExpense = document.getElementById('chart-expense').getContext('2d');
        this.dateToday = "".concat(new Date().getFullYear(), "-").concat((new Date().getMonth()) + 1, "-").concat(new Date().getDate());
        this.filterValue = "interval&dateFrom=".concat(this.dateToday, "&dateTo=").concat(this.dateToday);
        this.dateInterval = '';
        this.btnFilterClick = null;
        this.categoriesIncome = [];
        this.categoriesExpense = [];
        this.operations = [];
        this.incomeDataAmount = [];
        this.expenseDataAmount = [];
        this.myChartIncome = null;
        this.myChartExpense = null;
        this.intervalInit();
    }
    Main.prototype.intervalInit = function () {
        var _this = this;
        var dateFrom = document.getElementById('date-from');
        var dateTo = document.getElementById('date-to');
        var dateInterval = document.getElementById('date-interval');
        dateInterval.onchange = function () {
            var dateInterval = "&dateFrom=".concat(dateFrom.value, "&dateTo=").concat(dateTo.value);
            if (dateFrom.value && dateTo.value) {
                _this.dateInterval = dateInterval;
                _this.getDataTable();
                console.log('this.dateInterval', _this.dateInterval);
                console.log('Получили данные, отправляем запрос');
            }
        };
        this.showFilterBtn();
        this.getDataTable();
    };
    Main.prototype.getDataTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.filterValue === 'interval' && this.dateInterval === '') {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/operations?period=").concat(this.filterValue).concat(this.dateInterval))];
                    case 2:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 4];
                        this.operations = result;
                        return [4 /*yield*/, sidebar_1.Sidebar.getBalance()
                            // console.log('this.operations', this.operations)
                        ];
                    case 3:
                        _a.sent();
                        // console.log('this.operations', this.operations)
                        this.separationCategories();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.showFilterBtn = function () {
        var _this = this;
        var active = true;
        config_1.default.dataBtn.forEach(function (btn, index) {
            var filterBtn = document.createElement('button');
            filterBtn.innerText = btn;
            filterBtn.setAttribute('data-name', 'filter');
            filterBtn.className = 'btn btn-light border border-secondary me-3 px-3';
            if (active && index === 0) {
                filterBtn.classList.remove('btn-light');
                filterBtn.classList.add('btn-secondary');
            }
            filterBtn.addEventListener('click', function () {
                // console.log(filterBtn)
                active = false;
                _this.btnFilterClick = filterBtn;
                _this.dateInterval = '';
                var allFilterBtn = document.querySelectorAll('button[data-name="filter"]');
                allFilterBtn.forEach(function (el) {
                    el.classList.add('btn-light');
                    el.classList.remove('btn-secondary');
                });
                _this.btnFilterClick.classList.add('btn-secondary');
                _this.btnFilterClick.classList.remove('btn-light');
                _this.categoriesIncome = [];
                _this.categoriesExpense = [];
                _this.incomeDataAmount = [];
                _this.expenseDataAmount = [];
                _this.selectOperationsWithFilter();
            });
            document.getElementById('btn-wrapper').appendChild(filterBtn);
        });
    };
    Main.prototype.selectOperationsWithFilter = function () {
        switch (this.btnFilterClick.innerText) {
            case 'Сегодня':
                this.filterValue = "interval&dateFrom=".concat(this.dateToday, "&dateTo=").concat(this.dateToday);
                break;
            case 'Неделя':
                this.filterValue = 'week';
                break;
            case 'Месяц':
                this.filterValue = 'month';
                break;
            case 'Год':
                this.filterValue = 'year';
                break;
            case 'Все':
                this.filterValue = 'all';
                break;
            case 'Интервал':
                this.filterValue = 'interval';
                break;
        }
        this.getDataTable();
    };
    Main.prototype.incomeChartShow = function () {
        if (this.myChartIncome != null) {
            this.myChartIncome.destroy();
        }
        this.myChartIncome = new Chart(this.chartIncome, {
            type: 'pie',
            responsive: false,
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
        });
    };
    Main.prototype.expenseChartShow = function () {
        if (this.myChartExpense != null) {
            this.myChartExpense.destroy();
        }
        this.myChartExpense = new Chart(this.chartExpense, {
            type: 'pie',
            responsive: false,
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
        });
    };
    Main.prototype.separationCategories = function () {
        var _this = this;
        var incomeOperation = this.operations.filter(function (el) {
            return el.type === 'income';
        });
        var expenseOperation = this.operations.filter(function (el) {
            return el.type === 'expense';
        });
        console.log('incomeOperation', incomeOperation);
        console.log('expenseOperation', expenseOperation);
        var newObjectIncome = incomeOperation.reduce(function (object, operation) {
            if (object[operation.category]) {
                object[operation.category].push(operation);
            }
            else {
                object[operation.category] = [operation];
            }
            return object;
        }, {});
        var newObjectExpense = expenseOperation.reduce(function (object, operation) {
            if (object[operation.category]) {
                object[operation.category].push(operation);
            }
            else {
                object[operation.category] = [operation];
            }
            return object;
        }, {});
        console.log('newObjectIncome', newObjectIncome);
        console.log('newObjectExpense', newObjectExpense);
        console.log('Object.entries(income)', Object.entries(newObjectIncome));
        console.log('Object.entries(expense)', Object.entries(newObjectExpense));
        Object.entries(newObjectIncome).forEach(function (category) {
            _this.categoriesIncome.push(category[0]);
        });
        Object.entries(newObjectExpense).forEach(function (category) {
            _this.categoriesExpense.push(category[0]);
        });
        console.log('this.categoriesIncome', this.categoriesIncome);
        console.log('this.categoriesExpense', this.categoriesExpense);
        Object.entries(newObjectIncome).forEach(function (category) {
            var amount = 0;
            category[1].forEach(function (operation) {
                amount += operation.amount;
            });
            _this.incomeDataAmount.push(amount);
        });
        Object.entries(newObjectExpense).forEach(function (category) {
            var amount = 0;
            category[1].forEach(function (operation) {
                amount += operation.amount;
            });
            _this.expenseDataAmount.push(amount);
        });
        console.log('incomeDataAmount', this.incomeDataAmount);
        console.log('expenseDataAmount', this.expenseDataAmount);
        if (this.incomeDataAmount.length) {
            this.incomeChartShow();
        }
        if (this.expenseDataAmount.length) {
            this.expenseChartShow();
        }
        if (this.incomeDataAmount.length === 0 && this.expenseDataAmount.length === 0) {
            document.getElementById('main').style.display = 'none';
            document.getElementById('empty-block').style.display = 'block';
        }
        else {
            document.getElementById('main').style.display = 'block';
            document.getElementById('empty-block').style.display = 'none';
        }
    };
    return Main;
}());
exports.Main = Main;


/***/ }),

/***/ "./src/scripts/sidebar.ts":
/*!********************************!*\
  !*** ./src/scripts/sidebar.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sidebar = void 0;
var custom_http_1 = __webpack_require__(/*! ../../services/custom-http */ "./services/custom-http.ts");
var auth_1 = __webpack_require__(/*! ../../services/auth */ "./services/auth.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../config/config */ "./config/config.ts"));
var Sidebar = /** @class */ (function () {
    function Sidebar() {
    }
    Sidebar.getBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!localStorage.getItem(auth_1.Auth.accessTokenKey)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/balance"))];
                    case 2:
                        result = _a.sent();
                        document.getElementById('balance').innerText = "".concat(result.balance, "$");
                        if (result) {
                            return [2 /*return*/, result.balance];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Sidebar.updateBalance = function (newBalance) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!localStorage.getItem(auth_1.Auth.accessTokenKey)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/balance"), 'PUT', {
                                newBalance: newBalance
                            })];
                    case 2:
                        result = _a.sent();
                        document.getElementById('balance').innerText = "".concat(result.balance, "$");
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Sidebar;
}());
exports.Sidebar = Sidebar;


/***/ }),

/***/ "./src/scripts/table-categories/form.ts":
/*!**********************************************!*\
  !*** ./src/scripts/table-categories/form.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Form = void 0;
var custom_http_1 = __webpack_require__(/*! ../../../services/custom-http */ "./services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../../config/config */ "./config/config.ts"));
var sidebar_ts_1 = __webpack_require__(/*! ../sidebar.ts */ "./src/scripts/sidebar.ts");
var Form = /** @class */ (function () {
    function Form(page) {
        this.page = page;
        this.categories = null;
        this.createFormValue = null;
        this.optionById = null;
        this.optionId = null;
        this.urlParams = window.location.href.split('=')[1];
        this.urlSelectType = null;
        if (this.page === 'create')
            this.urlSelectType = this.urlParams;
        this.getType = null;
        this.selectType = document.getElementById('select-type');
        this.selectCategory = document.getElementById('select-category');
        this.amount = document.getElementById('amount');
        this.date = document.getElementById('date');
        this.comment = document.getElementById('comment');
        this.init();
    }
    Form.prototype.init = function () {
        var _this = this;
        if (this.page === 'edit') {
            var saveBtn = document.getElementById('save');
            saveBtn.innerText = 'Сохранить';
            saveBtn.onclick = function () { return _this.edit(); };
            document.getElementById('cancel').onclick = function () { return location.href = '#/table-categories'; };
            this.getOperationById();
        }
        this.fillingForm();
    };
    Form.prototype.getOperationById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.optionId = location.hash.split('=')[1];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/operations/").concat(this.optionId))];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            if (result.error) {
                                alert(result.message);
                            }
                            this.optionById = result;
                            this.editFormValue();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Form.prototype.editFormValue = function () {
        this.optionById.type === 'income' ? this.selectType.selectedIndex = 1 : this.selectType.selectedIndex = 2;
        this.optionById.type === 'income' ? this.getType = 'income' : this.getType = 'expense';
        this.urlSelectType = this.getType;
        this.getCategories();
        this.amount.value = this.optionById.amount;
        this.date.value = this.optionById.date;
        this.comment.value = this.optionById.comment;
    };
    Form.prototype.getCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.urlSelectType) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/categories/").concat(this.urlSelectType))];
                    case 2:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 4];
                        this.categories = result;
                        if (result.length === 0) {
                            console.log('Категорий нет!');
                        }
                        return [4 /*yield*/, sidebar_ts_1.Sidebar.getBalance()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 6];
                    case 6:
                        this.showCategoryOptions();
                        return [2 /*return*/];
                }
            });
        });
    };
    Form.prototype.showCategoryOptions = function () {
        if (this.categories) {
            var defaultOption = document.createElement('option');
            defaultOption.innerText = 'Категория...';
            defaultOption.setAttribute('hidden', 'hidden');
            defaultOption.setAttribute('selected', 'selected');
            document.getElementById('select-category').appendChild(defaultOption);
            this.categories.forEach(function (option) {
                var optionCategory = document.createElement('option');
                optionCategory.innerText = option.title;
                optionCategory.value = option.id;
                document.getElementById('select-category').appendChild(optionCategory);
            });
            if (this.page === 'edit')
                this.showSelectCategory();
        }
    };
    Form.prototype.showSelectCategory = function () {
        var _this = this;
        if (this.categories) {
            var selectedCategoryIndex = this.categories.findIndex(function (category) { return category.title === _this.optionById.category; });
            this.selectCategory.selectedIndex = selectedCategoryIndex + 2;
        }
    };
    Form.prototype.fillingForm = function () {
        var _this = this;
        this.getCategories();
        this.urlParams === 'income' ? this.selectType.selectedIndex = 1 : this.selectType.selectedIndex = 2;
        this.selectType.onchange = function () {
            _this.selectCategory.innerHTML = ' ';
            _this.urlSelectType = _this.selectType.value;
            _this.getCategories();
        };
        document.getElementById('form').onchange = function () {
            _this.urlSelectType = _this.selectType.value;
            _this.createFormValue = {
                type: _this.selectType.value,
                amount: +(_this.amount.value),
                date: _this.date.value,
                comment: _this.comment.value,
                category_id: +(_this.selectCategory.value),
            };
        };
        if (this.page === 'create')
            document.getElementById('save').onclick = function () { return _this.create(); };
        document.getElementById('cancel').onclick = function () { return location.href = '#/table-categories'; };
    };
    Form.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentBalance, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sidebar_ts_1.Sidebar.getBalance()];
                    case 1:
                        currentBalance = _a.sent();
                        console.log('currentBalance', currentBalance);
                        if (this.selectType.value === 'income') {
                            this.value = currentBalance + +(this.amount.value);
                        }
                        else {
                            this.value = currentBalance - +(this.amount.value);
                        }
                        console.log(+(this.amount.value));
                        console.log(this.value);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/operations"), 'POST', this.createFormValue)];
                    case 3:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 6];
                        if (result.error) {
                            alert(result.message);
                        }
                        if (!(result && !result.error)) return [3 /*break*/, 6];
                        return [4 /*yield*/, sidebar_ts_1.Sidebar.updateBalance(this.value)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, sidebar_ts_1.Sidebar.getBalance()];
                    case 5:
                        _a.sent();
                        location.href = '#/table-categories';
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Form.prototype.edit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/operations/").concat(this.optionId), 'PUT', this.createFormValue)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            if (result.error) {
                                alert(result.message);
                            }
                            location.href = '#/table-categories';
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        console.log(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Form;
}());
exports.Form = Form;


/***/ }),

/***/ "./src/scripts/table-categories/table-categories.ts":
/*!**********************************************************!*\
  !*** ./src/scripts/table-categories/table-categories.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TableCategories = void 0;
var custom_http_1 = __webpack_require__(/*! ../../../services/custom-http */ "./services/custom-http.ts");
var config_1 = __importDefault(__webpack_require__(/*! ../../../config/config */ "./config/config.ts"));
var sidebar_ts_1 = __webpack_require__(/*! ../sidebar.ts */ "./src/scripts/sidebar.ts");
var TableCategories = /** @class */ (function () {
    function TableCategories() {
        this.dateToday = "".concat(new Date().getFullYear(), "-").concat((new Date().getMonth()) + 1, "-").concat(new Date().getDate());
        this.filterValue = "interval&dateFrom=".concat(this.dateToday, "&dateTo=").concat(this.dateToday);
        this.operations = null;
        this.removeOptionId = null;
        this.btnEditId = null;
        this.dateInterval = '';
        this.btnFilterClick = null;
        this.optionById = null;
        this.value = null;
        this.init();
    }
    TableCategories.prototype.init = function () {
        var _this = this;
        document.getElementById('create-income').onclick = function () { return location.href = "#/table-categories/create_income-or-expenses?operations=income"; };
        document.getElementById('create-expense').onclick = function () { return location.href = "#/table-categories/create_income-or-expenses?operations=expense"; };
        var dateFrom = document.getElementById('date-from');
        var dateTo = document.getElementById('date-to');
        var dateInterval = document.getElementById('date-interval');
        dateInterval.onchange = function () {
            var dateInterval = "&dateFrom=".concat(dateFrom.value, "&dateTo=").concat(dateTo.value);
            if (dateFrom.value && dateTo.value) {
                _this.dateInterval = dateInterval;
                _this.getDataTable();
                console.log(_this.dateInterval);
                console.log('Получили данные, отправляем запрос');
            }
        };
        this.getDataTable();
        this.showThead();
        this.showFilterBtn();
    };
    TableCategories.prototype.getDataTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sidebar_ts_1.Sidebar.getBalance()];
                    case 1:
                        _a.sent();
                        if (this.filterValue === 'interval' && this.dateInterval === '') {
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/operations?period=").concat(this.filterValue).concat(this.dateInterval))
                            // console.log(result)
                        ];
                    case 3:
                        result = _a.sent();
                        // console.log(result)
                        if (result) {
                            this.operations = result;
                            document.getElementById('tbody').innerHTML = ' ';
                            this.showTable();
                        }
                        if (result.length === 0) {
                            // await Sidebar.getBalance()
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TableCategories.prototype.showTable = function () {
        if (this.operations) {
            var tbody_1 = document.getElementById('tbody');
            this.operations.forEach(function (operation, index) {
                var tr = document.createElement('tr');
                var number = document.createElement('td');
                number.className = "text-center fw-bold";
                number.innerText = "".concat(index + 1, " ");
                number.innerText = "".concat(index + 1, " ");
                var type = document.createElement('td');
                type.className = operation.type === 'income' ? 'text-center text-success' : 'text-center text-danger';
                type.innerText = operation.type === 'income' ? 'доход' : 'расход';
                var category = document.createElement('td');
                category.className = 'text-center';
                // this.createBlock('td', `text-center`)
                category.innerText = operation.category || null;
                var amount = document.createElement('td');
                amount.className = "text-center";
                amount.innerText = "".concat(operation.amount, " $");
                var validDate = operation.date.split('-');
                var date = document.createElement('td');
                date.className = "text-center";
                date.innerText = "".concat(validDate[2], ".").concat(validDate[1], ".").concat(validDate[0]);
                var comment = document.createElement('td');
                comment.className = "text-center";
                comment.innerText = operation.comment;
                var trash = document.createElement('td');
                trash.className = "text-center";
                trash.setAttribute('role', 'button');
                trash.setAttribute('data-name', 'delete');
                trash.setAttribute('data-id', operation.id);
                trash.setAttribute('data-bs-target', "#exampleModal");
                trash.setAttribute('data-bs-toggle', "modal");
                var trashImg = document.createElement('img');
                trashImg.setAttribute('src', '/images/trash-icon.png');
                trashImg.setAttribute('alt', 'trash');
                trash.appendChild(trashImg);
                var edit = document.createElement('td');
                edit.className = "text-center";
                edit.setAttribute('role', 'button');
                edit.setAttribute('data-name', 'edit');
                edit.setAttribute('data-id', operation.id);
                var editImg = document.createElement('img');
                editImg.setAttribute('src', '/images/pen-icon.png');
                editImg.setAttribute('alt', 'pen');
                edit.appendChild(editImg);
                tr.appendChild(number);
                tr.appendChild(type);
                tr.appendChild(category);
                tr.appendChild(amount);
                tr.appendChild(date);
                tr.appendChild(comment);
                tr.appendChild(trash);
                tr.appendChild(edit);
                tbody_1.appendChild(tr);
            });
        }
        this.removeOption();
        this.edit();
    };
    TableCategories.prototype.showThead = function () {
        config_1.default.theadTitle.forEach(function (ttl) {
            var title = document.createElement('th');
            title.innerText = ttl;
            title.className = 'text-center';
            document.getElementById('thead').appendChild(title);
        });
    };
    TableCategories.prototype.showFilterBtn = function () {
        var _this = this;
        var active = true;
        config_1.default.dataBtn.forEach(function (btn, index) {
            var filterBtn = document.createElement('button');
            filterBtn.innerText = btn;
            filterBtn.setAttribute('data-name', 'filter');
            filterBtn.className = 'btn btn-light border border-secondary me-3 px-3';
            if (active && index === 0) {
                filterBtn.classList.remove('btn-light');
                filterBtn.classList.add('btn-secondary');
            }
            filterBtn.addEventListener('click', function () {
                active = false;
                _this.btnFilterClick = filterBtn;
                _this.dateInterval = '';
                var allFilterBtn = document.querySelectorAll('button[data-name="filter"]');
                allFilterBtn.forEach(function (el) {
                    el.classList.add('btn-light');
                    el.classList.remove('btn-secondary');
                });
                _this.btnFilterClick.classList.add('btn-secondary');
                _this.btnFilterClick.classList.remove('btn-light');
                document.getElementById('tbody').innerHTML = ' ';
                _this.selectOperationsWithFilter();
            });
            document.getElementById('btn-wrapper').appendChild(filterBtn);
        });
    };
    TableCategories.prototype.selectOperationsWithFilter = function () {
        switch (this.btnFilterClick.innerText) {
            case 'Сегодня':
                this.filterValue = "interval&dateFrom=".concat(this.dateToday, "&dateTo=").concat(this.dateToday);
                break;
            case 'Неделя':
                this.filterValue = 'week';
                break;
            case 'Месяц':
                this.filterValue = 'month';
                break;
            case 'Год':
                this.filterValue = 'year';
                break;
            case 'Все':
                this.filterValue = 'all';
                break;
            case 'Интервал':
                this.filterValue = 'interval';
                break;
        }
        this.getDataTable();
    };
    // createBlock(tag, className) {
    //     const block = document.createElement(tag)
    //     if (className) {
    //         block.classList.add(className)
    //     }
    //     return block
    // }
    TableCategories.prototype.removeOption = function () {
        return __awaiter(this, void 0, void 0, function () {
            var removeOptions;
            var _this = this;
            return __generator(this, function (_a) {
                removeOptions = document.querySelectorAll('td[data-name="delete"]');
                removeOptions.forEach(function (option) {
                    option.addEventListener('click', function () {
                        _this.removeOptionId = option.getAttribute('data-id');
                    });
                });
                document.getElementById('confirm-delete').onclick = function () {
                    _this.getOptionsById();
                    _this.removeOptionRequest();
                };
                return [2 /*return*/];
            });
        });
    };
    TableCategories.prototype.getOptionsById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/operations/").concat(this.removeOptionId))];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            if (result.error) {
                                alert(result.message);
                            }
                            this.optionById = result;
                            console.log('this.optionById', this.optionById);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TableCategories.prototype.removeOptionRequest = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentBalance, result, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, sidebar_ts_1.Sidebar.getBalance()];
                    case 1:
                        currentBalance = _b.sent();
                        console.log('currentBalance', currentBalance);
                        if (((_a = this.optionById) === null || _a === void 0 ? void 0 : _a.type) === 'income') {
                            this.value = currentBalance - this.optionById.amount;
                        }
                        else {
                            this.value = currentBalance + this.optionById.amount;
                        }
                        console.log(this.value);
                        console.log(this.optionById.amount);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, , 8]);
                        return [4 /*yield*/, custom_http_1.CustomHttp.request("".concat(config_1.default.host, "/operations/").concat(this.removeOptionId), 'DELETE')];
                    case 3:
                        result = _b.sent();
                        if (!result) return [3 /*break*/, 6];
                        if (!!result.error) return [3 /*break*/, 6];
                        console.log(result.message);
                        return [4 /*yield*/, sidebar_ts_1.Sidebar.updateBalance(this.value)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.getDataTable()];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_3 = _b.sent();
                        console.log(e_3);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    TableCategories.prototype.edit = function () {
        var _this = this;
        var editButtons = document.querySelectorAll('td[data-name="edit"]');
        editButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                _this.btnEditId = btn.getAttribute('data-id');
                location.href = "#/table-categories/edit_income-or-expense?id=".concat(_this.btnEditId);
            });
        });
    };
    return TableCategories;
}());
exports.TableCategories = TableCategories;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!******************!*\
  !*** ./index.ts ***!
  \******************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var router_1 = __webpack_require__(/*! ./routes/router */ "./routes/router.ts");
var Index = /** @class */ (function () {
    function Index() {
        this.router = new router_1.Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
    }
    Index.prototype.handleRouteChanging = function () {
        this.router.openRoute();
        this.activeSidebarItem();
    };
    // if (localStorage.getItem(Auth.accessTokenKey) === null) {
    //     location.href = '#/login'
    // }
    Index.prototype.activeSidebarItem = function () {
        var navLinks = document.querySelectorAll('[data-name="nav"]');
        var currentUrl = location.hash.split('/')[1];
        var dropdownButton = document.getElementById('dropdown-button');
        navLinks.forEach(function (link) {
            if (currentUrl === link.querySelector('a').getAttribute('href').split('/')[1]) {
                link.classList.add('active');
                dropdownButton.classList.remove('active');
            }
            else {
                link.classList.remove('active');
            }
            if (currentUrl === 'income' || currentUrl === 'expense') {
                document.getElementById('dashboard-collapse').classList.add('show');
                dropdownButton.classList.add('btn-primary');
            }
            else {
                document.getElementById('dashboard-collapse').classList.remove('show');
                dropdownButton.classList.remove('btn-primary');
            }
        });
        dropdownButton.onclick = function () {
            dropdownButton.classList.toggle('active');
            dropdownButton.classList.toggle('rounded');
            if (document.getElementById('dashboard-collapse').classList.contains('active'))
                dropdownButton.classList.add('active');
        };
    };
    return Index;
}());
(new Index());

})();

/******/ })()
;