import React from "react";
import ApiConnect from "./api/ApiConnect";
import "./App.css";
import Card from "./Card";
import SearchAvatar from "./SearchAvatar";
import AddCard from "./AddCard";

class CardContainer extends React.Component {
  state = {
    searchInput: "",
    response: null,
    fullAvatarArr:[]
  };

  filterCards = (input) => {
    this.setState({ searchInput: input }, () => this.renderCards());
  };

  getUpdatedInformation = async () => {

    const currentUpdatedApi = await ApiConnect.get();
    //this.setState({ response: currentUpdatedApi.data});
    //const arr = await this.state.response.data;
    this.setState({ fullAvatarArr: currentUpdatedApi.data });
  };


  renderCards = () => {
    debugger;
    const avatarInfoContainer = this.state.fullAvatarArr.map((avatar,index) => {
      const fullName = `${avatar.first_name} ${avatar.last_name}`;
      return (
        (this.state.searchInput === "" ||
          fullName.includes(this.state.searchInput)) && (
          <Card
            key={index}
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
    return avatarInfoContainer;
    //this.setState({ cardsConatiner: avatarInfoContainer });
  };

  renderNewCard = async (info) => {
    await ApiConnect.post("", info);
    await this.getUpdatedInformation();
  };

  async componentDidMount() {
    this.getUpdatedInformation();
  }

  test = async (id) => {
    await ApiConnect.delete(`/${id}`);
    await this.getUpdatedInformation();
  };

  renderUpdateCard = async (id, info) => {
    await ApiConnect.put(`/${id}`, info);
    await this.getUpdatedInformation();
  };

  render() {
      if (this.state.fullAvatarArr == null || this.state.fullAvatarArr.length === 0) {
        return <p>loading...</p>
      }
      console.log(this.state.fullAvatarArr.length)
      return(
        <>
          <SearchAvatar onChange={this.filterCards} />
          <AddCard onClick={this.renderNewCard} />
          <div className="cards-container" >{this.renderCards()}</div>
        </>
    );
  }
}

export default CardContainer;
