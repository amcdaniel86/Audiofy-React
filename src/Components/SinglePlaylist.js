import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';


class SinglePlaylist extends Component {

// what we know now.. is the id of a project we want to show on this page.


  state = {
    nameInput: '',
    timeInput: '',
    editing: false
  }
// do I put songs array in state?

  componentWillMount() {
      const theID = this.props.match.params.id;
      Axios.get(`https://audiofy-project3am.herokuapp.com/api/playlist-details/${theID}`)
      .then((playlistIGetBackFromApi) => {
         console.log('----------=-=-=-==-=-=-=-------', playlistIGetBackFromApi) 

        this.setState({theActualPlaylist: playlistIGetBackFromApi.data,
              nameInput: playlistIGetBackFromApi.data.name,
              timeInput: playlistIGetBackFromApi.data.time
          })

      })
     .catch(() => {

      })

    }

        updateInput = (e) => {
          this.setState({
            [e.target.id]: e.target.value
          })
          //e.target is the thing that just got updated.// this.state[e.target.id] = e.target.value
          // fancy way of saying first way
        }


        editPlaylist = (e) => {
          e.preventDefault();
          // above prevents refreshing, works way React supposed to work.
          Axios.post(`https://audiofy-project3am.herokuapp.com/api/playlist-edit/${ this.state.theActualPlaylist._id}`,
          // grabs the id of the current project that we are looking at, at this point in time in the app flow.
          {theName: this.state.nameInput, theTime: this.state.timeInput})
          // including .state means we are able to change the default state of the component, thus after editing is complete.. we need to end the process by returning the state, below with setState, back to editing: false, so the form goes away and the user can continue using the site.
          .then(() => {
              this.setState({editing: false});
              // after submitting the form and the axios request is complete, we set this.state.editing back to false so the form disappears and the app works cleanly, and looks fancy.
          })
          .catch(() => {

          })
       }


        toggleForm  = () => {
          this.setState({editing: true})
        }
// simple function to allow editing of the state to occur, and for the user to edit json objects from the database/api.


// referenced below on component's return area in curly braces. better that way when using if statements and loops.
        showPlaylistDetails = () => {
            if(this.state.theActualPlaylist) {
              // notice multiple if statements for this function. If state is on anActualPlaylist AND if editing is true at the time, then yes, return a form the user can edit details in.
              
              if(this.state.editing) {
                // if state.editing is set to true, then a form will appear.

                return(

                  <form onSubmit={this.editPlaylist}>

                    <input className="input" value={this.state.nameInput} onChange={this.updateInput} id="nameInput" />

                    <input className="input" value={this.state.timeInput} onChange={this.updateInput} id="timeInput" />

                    <button>Submit changes</button>
                  
                  
                  </form>
                  // with forms, ALWAYS need a state at the top of the component to track the form. no forms on functional components.
                )
              } else {
                // by default, this.state.editing is set to false, so when page first loads, the form will not show. User will see the return area that is below. just this info, NOT the form.
                return(
                  <div>
                    <span>
                      {this.state.nameInput}
                    </span>

                    <span>
                      {this.state.timeInput}
                    </span>
                  {/* we can put a small image of a pen here, and add an onClick function to the image.
                  the onClick function will change this.state.editing to true, so the form will then appear. */}
                    <img onClick={this.toggleForm} className="pen-pic" src="https:aldksfjdaslkfj" alt="pic" />

                  </div>
                )
              }
            }
        }


            deleteProject = () => {
              Axios.post(`https://audiofy-project3am.herokuapp.com/api/playlist-delete/${ this.state.theActualPlaylist._id}`, {})
              .then(() => {
                this.props.history.push('/playlist-index');
                // redirect user over to playlist-index after deletion occurs.
              })
              .catch(() => {

              })
         }

         render() {
          //  console.log(this.props) test
          //  console.log(this.state) test
          return(
            <div>
              <h1> Playlist Details Page</h1>
                {this.showProjectDetails()}
                {/* notice this function controls how whether a form or info is shown on the page of the component when the user is on this component. and it shows up in the render part of the component. Thus, any way you want to show different things on components in different ways, the way to do it is to create a function for the part, and then after the function is decided and logic makes sense.. then call the function in the render of the component. */}

                    <div>
                      <button onClick={this.deletePlaylist} className="delete">Delete Playlist</button>
                    </div>




            </div>
          )
         }


      }



export default SinglePlaylist;