import React from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      moviesArray:[],
      showing:false
    };
    this.textChange = this.textChange.bind(this);
    this.searchResult = this.searchResult.bind(this);
    this.callTMDB = this.callTMDB.bind(this);
    this.renderMovie = this.renderMovie.bind(this);
    this.setStateIndex = this.setStateIndex.bind(this)
  }

  componentDidMount(){
    var self = this;
    $( "#autocomplete" ).autocomplete({
            autoFocus:true,
            select: function( event, ui ) {
              var index = ui.item.index;
              self.setStateIndex(index)
            }
        });
  }

  textChange(e){
    const string = e.target.value.toLowerCase()
    if(string.length>0){
      this.setState({
        showing:false
      })
    
      this.searchResult(string);
    }
   
  }

  callTMDB(string){
    const self = this;
    return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.themoviedb.org/3/search/movie?api_key="+config.api+"&query=" + string,
                type: "get",
                error : (request, status, error) => { reject(request); },
                success : (response, status, request) => { resolve(response); }
            });
        })
  }

  setStateIndex(index){
    console.log('mic check')
    this.setState({
      index:index,
      showing:true
      });
  }

  renderMovie(){
      if(this.state.showing){
        var movie = this.state.moviesArray[this.state.index]
        console.log(movie);
        var dateArray = movie.release_date.split('-');
        var formattedDate = dateArray[1]+'-'+dateArray[2]+'-'+dateArray[0];

        return(
          <div id="movieContainer">
            <div id="movieTitle">
                <h1>{movie.title}</h1>
            </div>

            <div id="moviePoster">
              <img src={" http://image.tmdb.org/t/p/w780/"+movie.poster_path} />
              <img id="backdrop" src={" http://image.tmdb.org/t/p/w1280/"+movie.backdrop_path} />
            </div>

            <div id="movieContent">
              <h4>Synopsis:</h4>
              <p>{movie.overview}</p>
              <p>Release Date: {formattedDate}</p>
            </div>

           
            
           
          </div>
        )
      }
  }

  searchResult(string){
    var self = this;
    this.callTMDB(string).then((response) => {
      const rawArray = response.results
      const parsedArray = []

      rawArray.forEach(function(movie,i){
        parsedArray.push({
          label:movie.title,
          value:movie.title,
          index:i
          })
      })

      self.setState({
        moviesArray:rawArray
        })

      $( "#autocomplete" ).autocomplete({
          source: parsedArray
      });
    });
  }
 
  render() {
    return (
    	<div id="wrapper">
        <Header/>
        <div id="autocompleteContainer">
          <input id="autocomplete" type="text" placeholder="Movie Title" onChange={this.textChange} />
        </div>
        {this.renderMovie()}
        <Footer/>
      </div>
      
    );
  }
}
export default App;