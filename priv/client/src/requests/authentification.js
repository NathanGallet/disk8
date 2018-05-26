import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { HTTP_API_URL } from '../utils/config';

class Request {
    constructor(url) {
        this.superagent = superagentPromise(_superagent, global.Promise);
    }

    delete(url) {
        this.superagent
            .del(`${HTTP_API_URL}${url}`)
        /* .use(tokenPlugin) */
            .then(responseBody),
    }

    get(url) {
        this.superagent
            .get(`${HTTP_API_URL}${url}`)
        /* .use(tokenPlugin) */
            .then(responseBody),
    }

    put(url, body) {
        this.superagent
            .put(`${HTTP_API_URL}${url}`, body)
        /* .use(tokenPlugin) */
            .then(responseBody),
    }

    post(url, body) {
        this.superagent
            .post(`${HTTP_API_URL}${url}`, body)
        /* .use(tokenPlugin) */
            .then(responseBody)
    }
}

export const Request = new Request();
