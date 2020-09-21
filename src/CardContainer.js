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
    response: null,
    fullAvatarArr:[]
  };

  filterCards = (input) => {
    this.setState({ searchInput: input }, () => this.renderCards());
  };

  getUpdatedInformation = async () => {
    this.setState({cardsConatiner:[]})
    const currentUpdatedApi = await ApiConnect.get();
    this.setState({ response: currentUpdatedApi});
    const arr = await this.state.response.data;
    this.setState({ fullAvatarArr: arr }, () => this.renderCards());
  };


  renderCards = () => {
    const avatarInfoContainer = this.state.fullAvatarArr.map((avatar) => {
      const fullName = `${avatar.first_name} ${avatar.last_name}`;
      return (
        (this.state.searchInput === "" ||
          fullName.includes(this.state.searchInput)) && (
          <Card
            updateApp={this.renderUpdateCard}
            deleteaApp={this.test}
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
    ApiConnect.post("", info);
    this.getUpdatedInformation();
  };

  async componentDidMount() {
    this.getUpdatedInformation();
  }

  test = async (id) => {
    ApiConnect.delete(`/${id}`);
    this.getUpdatedInformation();
  };

  renderUpdateCard = async (id, info) => {
    ApiConnect.put(`/${id}`, info);
    this.getUpdatedInformation();
  };

  render() {
      if (this.state.cardsConatiner.length === 0 || this.state.cardsConatiner == null) {
        return <p>loading...</p>
      }
      return(
        <>
          <SearchAvatar onChange={this.filterCards} />
          <AddCard onClick={this.renderNewCard} />
          <div className="cards-container">{this.state.cardsConatiner}</div>
        </>
    );
  }
}

export default CardContainer;
