import React from "react";
import "./Card.css";
import DeleteBtn from "./DeleteBtn";
import UpdateBtn from "./UpdateBtn";
import ApiConnect from "./api/ApiConnect";


class Card extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    src: "",
  };

  componentDidMount() {
    this.setState({
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      src: this.props.avatarSrc,
    });
  }

  remove = () => {
    this.props.deleteaApp(this.props.id);
  };

  update = (data) => {
    let infoToUpdate = {};
    for (const property in data) {
      data[property] !== "" && (infoToUpdate[property] = data[property]);
    }
    this.props.updateApp(this.props.id,infoToUpdate);
  };

  render() {
    return (
      <div className="card">
        <p>{`${this.state.firstName} ${this.state.lastName}`}</p>
        <img src={this.state.src}></img>
        <div className="card__btn">
          <DeleteBtn onClick={this.remove} />
          <UpdateBtn onClick={this.update} />
        </div>
      </div>
    );
  }
}

export default Card;
