import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(event) {
    const value = event.target.value;
    this.props.onSearch(value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter a Song, Album, or Artist"
          onChange={this.handleTermChange}
        />
        <button className="SearchButton">SEARCH</button>
      </div>
    );
  }
}
