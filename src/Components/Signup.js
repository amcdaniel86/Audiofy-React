import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';
import UserService from '../Services/UserService';
import { Link } from 'react-router-dom';

class Signup extends Component {

    state = { usernameInput: '', passwordInput: '' };
    service = new UserService();
    // a new UserService is created because UserService is a class. so service, makes a new instance of UserService as the default state for the Signup component. makes sense


    // handleChange() and handleSubmit() are added here.

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    
    handleFormSubmit = (e) => {
      e.preventDefault();
      // you could do axios.post(`${process.env.REACT_APP_API_URL}/signup`, {username: this.state.usernameInput, password: this.state.passwordInput}, {withCredentials: true})
      this.service.signup(this.state.usernameInput, this.state.passwordInput)
        .then((userFromDB) => {
            console.log('-=-=-=-=-=-=-=-=', userFromDB)
            this.props.logTheUserIntoAppComponent(userFromDB)
            // this.props. above, we wait for the API to give us the user object back after logging in.
            // after logging in, we then pass the user object back to  the App component.
            this.setState({usernameInput: '', passwordInput: ''})

            this.props.history.push('/playlist-index');
            // since redirect and views are NEVER used in react, above line sends the user back to the /playlist-index page once .then  is carried out.
        })
        .catch((err) => {
            console.log('error with submitting', err)
        })

    }

    render() {
      return(

        <div>
            <form onSubmit = {this.handleFormSubmit}>

              <label>Username:</label>
              <input type="text" name="usernameInput" value={this.state.usernameInput} onChange={ e => this.handleChange(e)} />
              {/* what happens here: in the render section, is where based on logic in top half of component, the component will then render html onto the page (DOM). here the username input box is filled from usernameInput from the state section. and when onChange runs, handleChange function runs. */}
              
              
              <label>Password:</label>
              <input name="passwordInput" value={this.state.passwordInput} onChange={ e => this.handleChange(e)} />
              {/* what happens here: in the render section, is where based on logic in top half of component, the component will then render html onto the page (DOM). here the password input box is filled from passwordInput from the state section. and when onChange runs, handleChange function runs. */}
            
              <input type="submit" value="Signup" />
            
            
            </form>

            <p>Already have account?
                {/* <Link to={'/'}>Login</Link> */}
                {/* why is above commented? */}
            </p>


        </div>
      )
    }





}

export default Signup;