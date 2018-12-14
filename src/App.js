import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import { Route, Switch, Link } from 'react-router-dom';

import PlaylistIndex from './Components/PlaylistIndex';
import SinglePlaylist from './Components/SinglePlaylist';

import AlbumlistIndex from './Components/AlbumlistIndex';
import SingleAlbumlist from './Components/SingleAlbumlist';

import Signup from './Components/Signup';
import Login from './Components/Login';
import UserService from './Services/UserService';


class App extends Component {

    state = {
      loggedInUser: null
    }

    service = new UserService();

    // component Mount Section

    componentDidMount(props) {
      this.fetchUser()
      // this, allows componentDidMount to grab the fetchUser function below because it is a part of class App at top of component.
    }


    fetchUser() {
      // if ( this.state.loggedInUser === null ) {
        this.service.loggedin()
          .then(theActualUserFromDB => {
            this.setState({
              // when fetchUser runs, if logged in, then change the state of App component to the current loggedInUser from the database.
              loggedInUser: theActualUserFromDB

              })
          })
          .catch( err => {
            console.log(' catch getting hit ')
            this.setState({
              // when fetchUser runs, but error shows, then change the state of App component to false, and do not allow log in user access.
              loggedInUser: false
            })
          })
      // }
    }

      logInTheUser = (userToLogin) => {

        this.setState({loggedInUser: userToLogin})
      }

      showUser = () => {
        if(this.state.loggedInUser) {
          // if the state of App component shows user as logged in.. then show the below div to welcome them.
          return(
            <div>Welcome, {this.state.loggedInUser.username}</div>
          )
        }
      }

      logout = () => {
        this.service.logout().then(() => {
          // WHY IN THE WORLD IS .THEN CONNECTED TO THIS HERE???
          this.setState({ loggedInUser: null });
        })
      }


  
  render() {
    // {this.fetchUser()}
    console.log(this.state)
    // why this.state here? to test?


    return (
        
  <div>
          {this.showUser()}
{/* // this works above because showUser uses an arrow function. */}
        <h1>The Index Main Page</h1>

        <nav class="nav-bar">
          <Link to="/playlist-index">All Playlists</Link>
          <Link to="/albumlist-index">All Albumlists</Link>
          <Link to="/signup">Sign Up For Account</Link>
          <Link to="/login">Login to Your Account</Link>
          <button onClick = {this.logout} >Logout</button>
        </nav>

{/* // if you need to pass props to a component you are rendering inside a route, you have to use render as opposed to component = {} */}
{/* // in addition, if you do above, (using render), then you must pass in {...this.props} so you're able to use this.props.history, this.props.history, this.props.match.params and the other this.props information from the DOM. */}
{/* // if you don't need to send .props like for an :id situation, then compenent = is sufficient, render isn't needed. */}

{/* // ROUTES IN REACT ARE IF STATEMENTS, OR SWITCH IN THIS CASE. */}
        <Switch>
              {/* ALL PLAYLISTS ROUTE */}
            <Route path="/playlist-index" render={(props) =>      <PlaylistIndex {...props} currentUser =     {this.state.loggedInUser} /> } />
            {/* above says, at this url, render props from the      PlaylistIndex component for the currentUser who's     session is currently running. */}
            {/* passing in {this.state.loggedInUser}, ANYTIME the user in the app component changes, it will changge in this specified component as well. Important to keep user's state consistent across the app's functionality. */}

            {/* SINGLE PLAYLIST ROUTE */}
            <Route path="/playlist/:id" component = {SinglePlaylist}  />
            {/*                     || */}
            {/*                      ---------------------------------*/}
            {/* in the SinglePlaylist component, we will have access || to whatever is in the url inside    this.props.match.params.id*/}
            {/* a component is capable of automatically adding in history, location, several elements from the DOM, that enables usage in other components, so a good way to enable that is use component = {component.name} */}
            {/* the parent for these components is Switch, the App component is SinglePlaylist and PlaylistIndex's grandparents. */}
            {/* in SinglePlaylist component, we have access to whatever is inside the url, inside this.props.match.params.id. */}

            {/* ALL ALBUMLISTS ROUTE */}
            <Route path="/albumlist-index" render={(props) =>         <AlbumlistIndex {...props} currentUser =        {this.state.loggedInUser} /> } />
            {/* above says, at this url, render props from the      AlbumlistIndex component for the currentUser who's      session is currently running. */}

            {/* SINGLE ALBUMLIST ROUTE */}
            <Route path="/albumlist/:id" component = {SingleAlbumlist} />

            {/* SIGNUP ROUTE */}
            <Route path="/signup" render = {(props) => <Signup {...props} logTheUserIntoAppComponent = {this.logInTheUser} /> } />
            {/* what is logTheUserIntoAppComponent =????? */}
{/* should set the state in the app component to keep app state consistent for the user. */}


            {/* LOGIN ROUTE */}
            <Route path="/login" render = {(props) => <Login {...props} logTheUserIntoAppComponent = {this.logInTheUser} /> } />
{/* what is logTheUserIntoAppComponent =????? */}


{/* // BELOW - TRYING TO FIX THE REACT ERROR */}
            {/* NEW PLAYLIST ROUTE */}
            <Route path="/playlist-new" render={(props) =>         <newPlaylist {...props} currentUser =        {this.state.loggedInUser} /> } />
            {/* above says, at this url, render props from the      NewPlaylist component for the currentUser who's      session is currently running. */}

            
            {/* NEWALBUMLIST ROUTE */}
            <Route path="/albumlist-index" render={(props) =>         <newAlbumlist {...props} currentUser =        {this.state.loggedInUser} /> } />
            {/* above says, at this url, render props from the      NewAlbumlist component for the currentUser who's      session is currently running. */}



        </Switch>

      <PlaylistIndex />


  </div>

    );
  }
}

export default App;

// ROUTES IN REACT are if statements, remember that.

// Be 100% certain that all components have user information in the same class, so it is never changed or altered while a user travels through my app.

{/* what is logTheUserIntoAppComponent =????? */}