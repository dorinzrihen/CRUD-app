import React from "react";
import ApiConnect from "./api/ApiConnect";
import "./App.css";
import Card from "./Card";
import SearchAvatar from "./SearchAvatar";
import AddCard from "./AddCard";

class CardContainer extends React.Component {
  state = {
    cardsConatiner: [],
    searchInput: "",
    fullAvatarArr: [],
    response: null,
  };

  filterCards = (input) => {
    this.setState({ searchInput: input }, () => this.renderCards());
  };

  getUpdatedInformation = async () => {
    const currentUpdatedApi = await ApiConnect.get();
    console.log(currentUpdatedApi);
    this.setState({ response: currentUpdatedApi})
    const arr = await this.state.response.data;
    this.setState({ fullAvatarArr: arr }, () =>
    this.renderCards())
  }

  renderCards = () => {
    console.log("and here");
    let avatarInfoContainer = this.state.fullAvatarArr.map((avatar) => {
      let fullName = `${avatar.first_name} ${avatar.last_name}`;
      return (
        (this.state.searchInput === "" ||
          fullName.includes(this.state.searchInput)) && (
          <Card
            onClick={this.renderUpdateCard}
            avatarSrc={avatar.avatar}
            firstName={avatar.first_name}
            lastName={avatar.last_name}
            id={avatar.id}
          />
        )
      );
    });
    this.setState({ cardsConatiner: avatarInfoContainer });
  };

  renderNewCard = async (info) => {
    await ApiConnect.post("", info);
    this.getUpdatedInformation();
  };

  async componentDidMount() {
    this.getUpdatedInformation();
  }

  renderUpdateCard = async () => {
    this.getUpdatedInformation();
  };

  render() {
    return (
      <>
        <SearchAvatar onChange={this.filterCards} />
        <AddCard onClick={this.renderNewCard} />
        <div className="cards-container">{this.state.cardsConatiner}</div>
      </>
    );
  }
}

export default CardContainer;
