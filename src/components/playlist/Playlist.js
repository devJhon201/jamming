import React from "react";
import "./Playlist.css";
import { TrackList } from "../trackList/TrackList";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          defaultValue={"New Playlist"}
          onChange={this.handleNameChange()}
        />
        <TrackList
          tracks={this.props.tracks}
          onMinusClick={this.props.onMinusClick}
          isRemoval={true}
        />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
