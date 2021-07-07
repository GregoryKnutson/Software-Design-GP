class Auth {
    constructor() {
        this.authenticated = false
    }

    login() {
        this.authenticated = true
    }

    logout(){
        this.authenticated = false
    }

    isAuthenticated() {
        console.log(this.authenticated)
        return this.authenticated
    }
}

export default new Auth()