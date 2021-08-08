import React from "react";
import "./Track.css";

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onPlusClick(this.props.track);
  }

  removeTrack() {
    this.props.onMinusClick(this.props.track);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button className="Track-action" onClick={this.removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="Track-action" onClick={this.addTrack}>
          +
        </button>
      );
    }
  }

  handlePlay(event) {
    const audios = [...document.getElementsByClassName("audios")];
    for (let i = 0; i < audios.length; i++) {
      if (event.target === audios[i]) {
        continue;
      }
      audios[i].pause();
    }
  }

  renderSampleTrack() {
    if (!this.props.previewSrc) {
      return <p>Sample not available.</p>;
    }
    return (
      <audio controls className="audios" onPlay={this.handlePlay}>
        <source src={this.props.previewSrc} type="audio/mpeg" />
        Your browser does not support this format of audio.
      </audio>
    );
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
          {this.renderSampleTrack()}
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
