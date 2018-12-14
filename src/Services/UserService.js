import Axios from 'axios';



class UserService {
// NOT A COMPONENT, A CLASS, thus requires a constructor()


  constructor() {
    let service = Axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    })
    // Axios.create allows you to preconfigure the url, and headers, of any axios requests.
// what happens is when we make an axios request with that object, we pass in a url from the api, and that back end api url gets added onto the end of the baseURL (localhost5000) we created the axios object with.
// Axios.create assumes that 'http: will be the beginning of every axios request we make.

    this.service = service;
  }

    signup = (username, password) => {
        return this.service.post('/signup', {username, password})
          .then(response => response.data)
    }

    login = (username, password) => {
        return this.service.post('/login', {username, password})
          .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/loggedin')
        // why this route a get, not a post?
        // no object in 2nd arg here, why?
        // because get route doesn't send data, post routes require an object because a post route sends something.
          .then(response => response.data)
    }

    logout = () => {
        return this.service.post('/logout', {})
          .then(response => response.data)
    }

}

export default UserService;

// how should I think of this page? like the passport file? it's just necessary?