
import React from 'react';
import './Card.css';

class DeleteBtn extends React.Component{

    onClickDelete = () => {
        this.props.onClick()
    }

    
    render(){
        return (
            <button className='delete-btn' onClick={this.onClickDelete}>Delete</button>
        );
    }
}


export default DeleteBtn;
