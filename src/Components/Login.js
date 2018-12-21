import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';
import UserService from '../Services/UserService';
import { Link } from 'react-router-dom';




class Login extends Component {

    state = { usernameInput: '', passwordInput: '' };
    loginUserService = new UserService();
     // a new UserService is created because UserService is a class. so service, makes a new instance of UserService as the default state for the Signup component. makes sense


    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }



    handleFormSubmit = (e) => {
      e.preventDefault();
      // you could do Axios.post(`${process.env.REACT_APP_API_URL}/login`, {username: this.state.usernameInput, password: this.state.passwordInput}, {withCredentials: true})
      this.loginUserService.login(this.state.usernameInput, this.state.passwordInput)
        .then((userFromDB) => {
          // here, we wait for the API to give us the user object back after logging in.
          this.setState({usernameInput: '', passwordInput: ''})
          // then we pass that user object grabbed from the API, and put it into the App component below.
          this.props.logTheUserIntoAppComponent(userFromDB)
          // above we are getting the User object from the db, and we are setting AppComponent.state.loggedInUser equal to it.

          this.props.history.push('/playlist-index');
          // React-Redirect to specified page.

        })
        .catch((err) => {
          console.log('error submitting form', err)

        })

    }



    render() {
      return(
        <div>

          <form onSubmit = {this.handleFormSubmit}>

            <label class="username">Username:</label>          
            <input class="username" type="text" name="usernameInput" value={this.state.usernameInput} onChange={ e => this.handleChange(e)} />
            
            
            <label class="username">Password:</label>          
            <input type="password" name="passwordInput" value={this.state.passwordInput} onChange={ e => this.handleChange(e)} />

            <input type="submit" value="Login" />

          </form>

        </div>
      )
    }


}


export default Login;

// this.props.history.push is the redirect version for React. The React version of express' res.redirect.