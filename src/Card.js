import React from "react";
import "./Card.css";
import DeleteBtn from "./DeleteBtn";
import UpdateBtn from "./UpdateBtn";
import ApiConnect from "./api/ApiConnect";

const updateApi = (id, data) => {
    ApiConnect.put(`/${id}`, data);
  };

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

  remove = async () => {
    await ApiConnect.delete(`${this.props.id}`);
    await this.props.onClick();
  };

  update = async (data) => {
      let infoToUpdate = {}
    for (const property in data) {
        data[property] !== '' && (infoToUpdate[property] = data[property])
    }
    let test = async () => { await updateApi(this.props.id, infoToUpdate)};
    test().then(this.props.onClick());
  };

  render() {
    return (
      <div className="card">
        <p>{`${this.state.firstName} ${this.state.lastName}`}</p>
        <img src={this.state.src}></img>
        <div>
          <UpdateBtn onClick={this.update} />
          <DeleteBtn onClick={this.remove} />
        </div>
      </div>
    );
  }
}

export default Card;
