import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import NewAlbumlist from './NewAlbumlist';


class AlbumlistIndex extends Component {

    state = {
        allTheAlbumlists: []
    }
    // empty array is preferred.

 // remember: first time the render function runs, the state will look exactly like it is set it up in the constructor above. (an empty array)
    // since we are doing this.state.allTheAlbumlists.map, == an empty array in the beginnning is a clever trick because first time the component renders, the state will have an empty array, and will loop through the empty array and show nothing.
    // you will not see it though because it happens quickly.
    // and if we don't start our state with equalling our this.state.allTheAlbumlists to an empty array, it will throw an error, because we are trying to do .map on NULL which is not allowed or possible.

    // componentWillMount runs everytime the Component is about to be rendered on the page. in this function, we we will establish an Axios request to our API route through the fetchAlbumlists() function.
    // the response we get back should be equal to an object with a .data key inside of it, .data will be equal to all the Albumlist json's we get from the API.

    componentWillMount() {
      this.fetchAlbumlists();
    }
    // another way to see this lifecyle method, is WillMount happens everytime the transition from the component not being there to appearing, happens. Within that time, this method will run, pulling the fetchAlbumlists() with it.
    // kind of like changing views in backend. each time a component shows up, if it is to stay on the page

    fetchAlbumlists = () => {
        // function that can be called from other functions in the component.
      Axios.get('http://localhost:5000/api/albumlists')
      .then((responseFromApi) => {
        // responseFromApi is the array of objects from  the Api.

        // error showing .map, .filter, forEach is not a function, that means not an array is being targeted, probably missing something like .data.

        // once we have all the Albumlists, we setState so the state will then have all the Albumlists in it, and able to show them on the page.
        this.setState({allTheAlbumlists: responseFromApi.data.reverse()})
        // .reverse is so we see the newest Albumlists at the top of the page. .data would show oldest Albumlists at the top without putting reverse.
      })
      .catch((err) => {

      })
    }

    // componentWillReceiveProps(){
      // want something when the props change, 
  // } not applicable here


// because componentWillMount will still allow the component to initialize before running, we can protect ourselves by putting an if statement before anytime we want to loop something that is in our state.
    showAllAlbumlists = () => {
      if(this.state.allTheAlbumlists && this.props.currentUser) {
        // this above if statement protects the state of the page by verifying as long as the user is logged in and allTheAlbumlists have ran as well, then YES, perform the showAllAlbumlists function.
        
        // including .state isn't necessary in a functional component because there is no state in functional components, for above and below.
          const myAlbumlists = this.state.allTheAlbumlists.filter((eachAlbumlist) => {
              return eachAlbumlist.owner === this.props.currentUser._id
            // .owner??????
          })
          // i.e. once all the Albumlists are in the state, THEN we can map through them as a loop.
          return myAlbumlists.map((eachAlbumlist) => {
            return(
              <div key = {eachAlbumlist._id}>
              {/* key goes in this div, on main component. */}
                <h3>{eachAlbumlist.name}</h3>
                <h4>{eachAlbumlist.creator}</h4>
                <h6>{eachAlbumlist.time}</h6>
                <Link to = {'/albumlist/' + eachAlbumlist._id} >See Details </Link>
              
            

              </div>
            )
        })
      }
    }



    // render function runs once, when the component's state is equal to the default state from the top right under extends Component. if the default state is null, then function .map will not work. if the default state is [], an empty array, like mentioned earlier, then function .map will work. along with other functions, like .filter, .reduce etc. 



    render() {
      // console.log('-=-=-=-=-=-=-=-=', this.state); a test
      return(
        <div>
          {/* Now here, is where we have to show all the Albumlists on the page, this happens in the render function. Logic is above in functions, 1st half or so of component, and then in render is when what the visual will end up becoming depending on the rules of state and the above logic. */}
          <h1>Albumlist Index</h1>

          <div className="list-of-albumlists-container">
            {this.showAllAlbumlists()}
          </div>
          
          <div className="add-new-component-container">
            <NewAlbumlist letTheIndexComponentKnowThatWeAddedAlbumlist = {this.fetchAlbumlists} />
            {/* we pass in this function in the AlbumlistIndex Component, so after we add a new Albumlist in the NewAlbumlist Component, the NewP Component, will be able to tell the AlbumlistIndex Component to check for any new Albumlists that we're added since the last render of AlbumlistIndex.*/}
          </div>
          
          
          
          
        </div>
      )
    }




}


export default AlbumlistIndex;