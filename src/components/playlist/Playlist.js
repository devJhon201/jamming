import React from "react";
import "./Playlist.css";
import { TrackList } from "../trackList/TrackList";

export class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} />
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
