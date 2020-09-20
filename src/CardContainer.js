import React from "react";
import ApiGet from "./api/ApiConnect";
import "./App.css";
import Card from "./Card";
import SearchAvatar from "./SearchAvatar";
import AddCard from "./AddCard";

class CardContainer extends React.Component {
  state = {
    randomAvatar: [],
    searchInput: "",
    fullAvatarArr: [],
    response: null,
  };

  filterCards = (input) => {
    this.setState({ searchInput: input }, () => this.renderCards());
  };

  async getUpdatedInformation() {
    this.setState({ response: await ApiGet.get()}, () => {this.setState({ fullAvatarArr: this.state.response.data }, () =>
    this.renderCards()
  )});
    
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
    this.setState({ randomAvatar: avatarInfoContainer });
  };

  renderNewCard = async (info) => {
    await ApiGet.post("", info);
    this.getUpdatedInformation();
  };

  async componentDidMount() {
    this.getUpdatedInformation();
  }

  renderUpdateCard = async () => {
    console.log("#3");
    this.getUpdatedInformation();
  };

  render() {
    return (
      <>
        <SearchAvatar onChange={this.filterCards} />
        <AddCard onClick={this.renderNewCard} />
        <div className="cards-container">{this.state.randomAvatar}</div>
      </>
    );
  }
}

export default CardContainer;
