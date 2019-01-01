import Requests from '../utils/requests';
import { STATUS_SUCCESS_CREATED } from '../constants/code_server';

/*
   All requests to the endpoint /api/user,
   from phoenix :

   POST    /api/users     Disk8Web.UserController :create
   GET     /api/user/:id  Disk8Web.UserController :show
   PUT     /api/user/:id  Disk8Web.UserController :update
   DELETE  /api/user/:id  Disk8Web.UserController :delete
   GET     /api/users     Disk8Web.UserController :index
 */

class UserRequests {
    // Create user
    create(body) {
        return Requests
            .post(`/user`, body)
            .then(
                response => {
                    if (response.status != STATUS_SUCCESS_CREATED) {
                        throw response;
                    }
                    return response.json();
                });
    }

    // Get one user
    show(id) {
        return Requests.get(`/user/${id}`);
    }

    // Update user
    update(id, body) {
        return Requests.put(`/user/${id}`, body);
    }

    // Delete user
    delete(id) {
        return Requests.delete(`/user/${id}`);
    }

    // Get all users
    getAll() {
        return Requests.get(`/users`);
    }
}

export default new UserRequests();
