import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';
// import AlbumlistIndex from './AlbumlistIndex';
// import Signup from '/Signup';
// import { Link } from 'react-router-dom';


class NewAlbumlist extends Component {

    state = {
      nameInput: '',
      timeInput: '',
      albumsInput: ''
    }


    updateInput = (e) => {

      this.setState({[e.target.id]: e.target.value})
      // e.target is the thing that just got updated.
      // this.state[e.target.id] = e.target.value: same as first one.
    }


    createNewAlbumlist = (e) => {
      e.preventDefault();
      // e.prevent prevents refreshing from happening, to help React work properly.
      // step 1: Grab data from state and make a copy of it so you can manipulate the data in functions within this function.
        const newName = this.state.nameInput;
        const newTime = this.state.timeInput;
        // grab values from the DOM
        // ??not sure how to pull in req.body from api.
        
// the below Axios.post route, you must include withCredentials as an object because the route we are posting to, uses req.user which by default is protected by express.
      Axios.post('http://localhost:5000/api/albumlists/add-new', {theName: newName, theTime: newTime }, {withCredentials: true})
      // ??not sure how to pull in req.body from api.
      // 2nd argument must be an object above, after the path address http...
      .then((responseFromOurApi) => {
        // .then here, communicates to the api, make a new instance of the Albumlist  model in the backend from the api post add-new route.
          console.log('success', responseFromOurApi)
          this.props.letTheIndexComponentKnowThatWeAddedAnAlbumlist();
          // after we send the axios request to the api, we call the function in the parent component - (AlbumlistIndex in this case) to make that Component go and get allTheAlbumlists again, and now the list will have the new Albumlist that was just created and added.
      })
      .catch((err) => {
        console.log('error creating Albumlist sorry', err)
      })
    }


render() {
  return(
    <div>

      <h2> Add New Albumlist</h2>
        <form onSubmit = {this.createNewAlbumlist}>
        
          <label>Name</label>        
          <input value={this.state.nameInput} id="nameInput" onChange={this.updateInput} />
          {/* for a form, the input must have value={this.state.labelInput} labelInput is from key at top of component. */}
          
          <label>Time</label>        
          <input value={this.state.timeInput} id="timeInput" onChange={this.updateInput} />

          <button>Save</button>


        </form>


    </div>
  )
}







}

export default NewAlbumlist;