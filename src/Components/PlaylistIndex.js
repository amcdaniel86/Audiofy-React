import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import NewPlaylist from './NewPlaylist';


class PlaylistIndex extends Component {

    state = {
        allThePlaylists: []
    }
    // empty array is preferred.

 // remember: first time the render function runs, the state will look exactly like it is set it up in the constructor above. (an empty array)
    // since we are doing this.state.allThePlaylists.map, == an empty array in the beginnning is a clever trick because first time the component renders, the state will have an empty array, and will loop through the empty array and show nothing.
    // you will not see it though because it happens quickly.
    // and if we don't start our state with equalling our this.state.allThePlaylists to an empty array, it will throw an error, because we are trying to do .map on NULL which is not allowed or possible.

    // componentWillMount runs everytime the Component is about to be rendered on the page. in this function, we we will establish an Axios request to our API route through the fetchPlaylists() function.
    // the response we get back should be equal to an object with a .data key inside of it, .data will be equal to all the playlist json's we get from the API.

    componentWillMount() {
      this.fetchPlaylists();
    }
    // another way to see this lifecyle method, is WillMount happens everytime the transition from the component not being there to appearing, happens. Within that time, this method will run, pulling the fetchPlaylists() with it.
    // kind of like changing views in backend. each time a component shows up, if it is to stay on the page

    fetchPlaylists = () => {
        // function that can be called from other functions in the component.
      Axios.get('http://localhost:5000/api/playlists')
      .then((responseFromApi) => {
        // responseFromApi is the array of objects from  the Api.

        // error showing .map, .filter, forEach is not a function, that means not an array is being targeted, probably missing something like .data.

        // once we have all the playlists, we setState so the state will then have all the Playlists in it, and able to show them on the page.
        this.setState({allThePlaylists: responseFromApi.data.reverse()})
        // .reverse is so we see the newest playlists at the top of the page. .data would show oldest playlists at the top without putting reverse.
      })
      .catch((err) => {

      })
    }

    // componentWillReceiveProps(){
      // want something when the props change, 
  // } not applicable here


// because componentWillMount will still allow the component to initialize before running, we can protect ourselves by putting an if statement before anytime we want to loop something that is in our state.
    showAllPlaylists = () => {
      if(this.state.allThePlaylists && this.props.currentUser) {
        // this above if statement protects the state of the page by verifying as long as the user is logged in and allThePlaylists have ran as well, then YES, perform the showAllPlaylists function.
        
        // including .state isn't necessary in a functional component because there is no state in functional components, for above and below.
          const myPlaylists = this.state.allThePlaylists.filter((eachPlaylist) => {
              return eachPlaylist.owner === this.props.currentUser._id
            // .owner??????
          })
          // i.e. once all the playlists are in the state, THEN we can map through them as a loop.
          return myPlaylists.map((eachPlaylist) => {
            return(
              <div key = {eachPlaylist._id}>
              {/* key goes in this div, on main component. */}
                <h3>{eachPlaylist.name}</h3>
                <h4>{eachPlaylist.creator}</h4>
                <h6>{eachPlaylist.time}</h6>
                <Link to = {'/playlist/' + eachPlaylist._id} >See Details </Link>
              
              </div>
            )
        })
      }
    }



    render() {
      return(
        <div>

        </div>
      )
    }




}


export default PlaylistIndex;