import React from "react";
import "./Card.css";
import NewFiled from "./NewFiled";
import ApiGet from "./api/ApiConnect";

class AddCard extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    avatar: "",
  };

  updateFirstName = (info) => {
    this.setState({ first_name: info });
  };

  updateLastName = (info) => {
    this.setState({ last_name: info });
  };

  updateavatar = (info) => {
    this.setState({ avatar: info });
  };

  createNewCard = () => {
    this.setState({ first_name: "", last_name: "", avatar: "" });
    this.props.onClick(this.state);
    
  };



  render() {
    return (
      <div>
        <h3>Add new Card</h3>
        <NewFiled
          title="first name"
          onChange={this.updateFirstName}
          value={this.state.first_name}
        />
        <NewFiled
          title="last name"
          onChange={this.updateLastName}
          value={this.state.klast_name}
        />
        <NewFiled
          title="img avatar"
          onChange={this.updateavatar}
          value={this.state.avatar}
        />
        <button onClick={this.createNewCard}>Create</button>
      </div>
    );
  }
}

export default AddCard;
