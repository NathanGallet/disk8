import { HTTP_API_URL } from '../constants/constants';

// Simple Request Manager to handle CRUD actions
// TODO: need to set options on headers but content-type make allow-access policy problem
class RequestsManager {

    // CREATE
    post(url, body) {
        return fetch(`${HTTP_API_URL}${url}`, {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            method: 'POST',
            body: JSON.stringify(body)
        })
    }

    // READ
    get(url) {
        return fetch(`${HTTP_API_URL}${url}`, {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            method: 'GET'
        })
    }

    // UPDATE
    put(url, body) {
        return fetch(`${HTTP_API_URL}${url}`, {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    // DELETE
    delete(url) {
        return fetch(`${HTTP_API_URL}${url}`, {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            method: 'DELETE'
        })
    }
}

export default new RequestsManager();
