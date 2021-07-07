const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100) // fake async
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100) // fake async
      console.log("signed out")
    },
    checkIsAuthenticated(){
        if (this.isAuthenticated === true)
            return true
        else return false
    }
  }

  export default fakeAuth