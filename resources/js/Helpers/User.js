import token from "./token";
import AppStorage from "./AppStorage";

class User {
    login(data) {
        axios.post('/api/auth/login', data)
            .then(res => this.responseAfterLogin(res))
            .catch(err => console.log(err.response.data))
    }

    responseAfterLogin(res) {
        const access_token = res.data.access_token;
        const username = res.data.user;

        if (token.isValid(access_token)) {
            AppStorage.store(access_token, username)
        }
        window.location = '/forum'
    }

    hasToken() {
        const storedToken = AppStorage.getToken()

        if (storedToken) {
            return token.isValid(storedToken) ? true : false
        }
        return false

    }

    loggedIn() {
        return this.hasToken()
    }

    logout() {
        AppStorage.clear()
        window.location = '/forum'
    }

    name() {
        return AppStorage.getUser()
    }

    id() {
        if (this.loggedIn()) {
            const payload = token.payload(AppStorage.getToken())
            return payload.sub
        }
    }

    own(id) {
        return this.id() == id
    }


}

export default User = new User();
