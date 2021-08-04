import React from "react";
import "./App.css";
import { SearchBar } from "../searchBar/SearchBar.js";
import { SearchResults } from "../searchResults/SearchResults";
import { Playlist } from "../playlist/Playlist.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { id: 1, name: "Hello", artist: "Adele", album: "First album" },
        { id: 2, name: "Safaera", artist: "Bad bunny", album: "Second album" },
        {
          id: 3,
          name: "Me gustas mucho",
          artist: "Rocio durcal",
          album: "Third album",
        },
      ],
      playListName: "Buena",
      playListTracks: [
        { id: 1, name: "Hello", artist: "Adele", album: "First album" },
        { id: 2, name: "Safaera", artist: "Bad bunny", album: "Second album" },
        {
          id: 3,
          name: "Me gustas mucho",
          artist: "Rocio durcal",
          album: "Third album",
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    const playList = this.state.playListTracks;
    let alreadyAdded = false;

    playList.forEach((elemento) => {
      if (track.id === elemento.id) {
        alreadyAdded = true;
      }
    });
    if (!alreadyAdded) {
      playList.push(track);
      this.setState({
        playListTracks: playList,
      });
    }
  }

  removeTrack(track) {
    const playList = this.state.playListTracks;

    playList.forEach((elemento, index) => {
      if (track.id === elemento.id) {
        playList.splice(index, 1);
      }
    });

    this.setState({
      playListTracks: playList,
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playListName: name,
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              results={this.state.searchResults}
              onPlusClick={this.addTrack}
            />
            <Playlist
              name={this.state.playListName}
              tracks={this.state.playListTracks}
              onMinusClick={this.removeTrack}
              onNameChange={this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
