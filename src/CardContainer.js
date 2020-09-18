import React from 'react';
import ApiGet from './api/ApiConnect';
import './App.css';
import Card from './Card';
import SearchAvatar from './SearchAvatar';
import ApiConnect from './api/ApiConnect';

class CardContainer extends React.Component{
    state = {
        randomAvatar: [],
        searchInput:'',
        fullAvatarArr:[],
    }

    filterCards = (input) => {
        this.setState({searchInput:input},() => this.renderCards());
    }

    renderCards = () => {
        let  avatarInfoContainer= this.state.fullAvatarArr.map((avatar) => {
            let fullName = `${avatar.first_name} ${avatar.last_name}`
            return (this.state.searchInput ==='' || fullName.includes(this.state.searchInput)) &&<Card  avatarSrc={avatar.avatar}avatarInfo={fullName} id={avatar.id}/>
        })
        this.setState({randomAvatar:avatarInfoContainer})
    }
    

    async componentDidMount(){
        const response = await ApiGet.get();
        this.setState({fullAvatarArr:response.data}, () => this.renderCards())
    }
    
    render(){
        return (
            <>
                <SearchAvatar onChange={this.filterCards}/>
                <div className="cards-container">
                    {this.state.randomAvatar}
                </div>
            </>

        );
    }
}


export default CardContainer;
