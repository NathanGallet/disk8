import Requests from '../utils/requests';

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
        Requests
            .post(`/users`, body)
            .then(
                response => {
                    if (response.status != 200) {
                        throw response;
                    }
                    return response.json();
                },
                error => {
                    console.error('error: ', error);
                    throw error;
                });
    }

    // Get one user
    show(id) {
        Requests.get(`/user/${id}`);
    }

    // Update user
    update(id, body) {
        Requests.put(`/user/${id}`, body);
    }

    // Delete user
    delete(id) {
        Requests.delete(`/user/${id}`);
    }

    // Get all users
    getAll() {
        Requests.get(`/users`);
    }

}

export default new UserRequests();
