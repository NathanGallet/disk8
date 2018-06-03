import { isEmpty } from 'lodash';

const parse = JSON.parse;
const stringify = JSON.stringify;


class Auth {

    clear(key) {
        if (localStorage && localStorage.getItem(key)) {
            return localStorage.removeItem(key);
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return sessionStorage.removeItem(key);
        }

        return null;
    }

    clearAppStorage() {
        if (localStorage) {
            localStorage.clear();
        }

        if (sessionStorage) {
            sessionStorage.clear();
        }
    }

    clearToken(tokenKey) {
        return this.clear(tokenKey);
    }

    clearUserInfo(userInfo) {
        return this.clear(userInfo);
    }

    get(key) {
        if (localStorage && localStorage.getItem(key)) {
            return parse(localStorage.getItem(key)) || null;
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return parse(sessionStorage.getItem(key)) || null;
        }

        return null;
    }

    getToken(tokenKey) {
        return this.get(tokenKey);
    }

    getUserInfo(userInfo) {
        return this.get(userInfo);
    }

    set(value, key, isLocalStorage) {
        if (isEmpty(value)) {
            return null;
        }
        if (isLocalStorage && localStorage) {
            return localStorage.setItem(key, stringify(value));
        }
        if (sessionStorage) {
            return sessionStorage.setItem(key, stringify(value));
        }

        return null;
    }

    setToken(value = '', isLocalStorage = false, tokenKey) {
        return this.set(value, tokenKey, isLocalStorage);
    }

    setUserInfo(value = '', isLocalStorage = false, userInfo) {
        return this.set(value, userInfo, isLocalStorage);
    }

};

export default new Auth();
