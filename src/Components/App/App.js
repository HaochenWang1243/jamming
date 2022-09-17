import './App.css';
import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar.js'
import {SearchResults} from '../SearchResults/SearchResults.js'
import {Playlist} from '../Playlist/Playlist.js'
import {Spotify}  from '../../util/Spotify'
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      SearchResults:[],
      PlaylistName:'New Playlist',
      PlaylistTracks:[]
    };
    this.addTrack=this.addTrack.bind(this)
    this.removeTrack=this.removeTrack.bind(this)
    this.updatePlaylistName=this.updatePlaylistName.bind(this)
    this.savePlaylist=this.savePlaylist.bind(this)
    this.search=this.search.bind(this)

  }
  updatePlaylistName(name){
    this.setState({PlaylistName:name});
  }
  addTrack(track){
    let tracks=this.state.PlaylistTracks;
    tracks.push(track);
    this.setState({PlaylistTracks:tracks});
  }
  removeTrack(track){
    let tracks=this.state.PlaylistTracks;
    tracks=tracks.filter(curr=>curr.id!==track.id);
    this.setState({PlaylistTracks:tracks});
  }

  savePlaylist(){
    const trackUris=this.state.PlaylistTracks.map(track=>track.uri)
    Spotify.savePlaylist(this.state.PlaylistName,trackUris).then(
      ()=>{this.setState({
        PlaylistName:'New Playlist',
        PlaylistTracks:[]
      })}
    )
  }
  search(term){
    Spotify.search(term).then(result=>{this.setState({SearchResults:result})})
  }
  render(){
    return (
      <div>
        {Spotify.getAccessToken()}
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults results={this.state.SearchResults} add={this.addTrack}/>
            <Playlist name={this.state.PlaylistName} tracks={this.state.PlaylistTracks} remove={this.removeTrack}
                      rename={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
