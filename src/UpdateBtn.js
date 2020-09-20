
import React from 'react';
import './Card.css';
import UpdateCardFiled from './UpdateCardFiled';

class UpdateBtn extends React.Component{
    state = {
        isClicked: false,
        updateFiled: null
    }

    componentDidMount(){
        const updateFiled = <UpdateCardFiled onClick={this.updateIndfo}/>
        this.setState({updateFiled});
    }

    updateCard = () => {
        this.setState({isClicked: true});
    }

    updateIndfo = (info) => {
        this.setState({isClicked: false});
        this.props.onClick(info);
    }

    
    render(){
        return (
            <>
                <button className="update-btn" onClick={this.updateCard}>Update</button>
                <div>
                    {this.state.isClicked && this.state.updateFiled}
                </div>
            </>

        );
    }
}


export default UpdateBtn;
