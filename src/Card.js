
import React from 'react';
import ApiConnect from './api/ApiConnect';
import './Card.css';
import DeleteBtn from './DeleteBtn'
import UpdateBtn from './UpdateBtn'

class Card extends React.Component{
    remove = id => {
        return ApiConnect.delete(`${id}`);
    };

    onClickDeleteBtn = () => {
        this.remove(`${this.props.id}`)
    }

    
    render(){
        return (
            <div className="card">
                <p>{this.props.avatarInfo}</p>
                <img src={this.props.avatarSrc}></img>
                <div>
                    <UpdateBtn/>
                    <DeleteBtn onClick={this.onClickDeleteBtn}/>
                </div>
            </div>
        );
    }
}


export default Card;
