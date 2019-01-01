import Requests from '../utils/requests';
import { STATUS_SUCCESS_CREATED } from '../constants/code_server';

/*
    session_path  POST    /api/user/login   Disk8Web.SessionController :create
    session_path  DELETE  /api/user/logout  Disk8Web.SessionController :delete

 */

class SessionRequests {
    /* Body :
    user: {
       name: "name",
       password: "password"
    } */
    login(body) {
        return Requests
            .post(`/user/login`, body)
            .then(
                response => {
                    if (response.status != STATUS_SUCCESS_CREATED) {
                        throw response.statusText;
                    }
                    return response.json();
                });
    }
}

export default new SessionRequests();
