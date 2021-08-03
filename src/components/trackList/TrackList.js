import React from "react";
import "./TrackList.css";
import { Track } from "../track/Track.js";

export class TrackList extends React.Component {
  renderTracks(tracks) {
    tracks = tracks.map((track) => {
      return (
        <Track
          key={track.id}
          track={track}
          onPlusClick={this.props.onPlusClick}
          onMinusClick={this.props.onMinusClick}
          isRemoval={this.props.isRemoval}
        />
      );
    });

    return tracks;
  }

  render() {
    return (
      <div className="TrackList">{this.renderTracks(this.props.tracks)}</div>
    );
  }
}
