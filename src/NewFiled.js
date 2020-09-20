import React from "react";
import ApiConnect from "./api/ApiConnect";
import "./Card.css";

class NewFiled extends React.Component {
  state = {
    value: this.props.value,
  };

  insertInfo = (event) => {
    this.setState({ value: event.target.value }, () => {
      this.props.onChange(this.state.value);
    });
  };

  render() {
    return (
      <div>
        <label>{this.props.title}</label>
        <input
          type="text"
          onChange={this.insertInfo}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default NewFiled;
