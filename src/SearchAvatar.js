import React from 'react';
import './App.css';


class SearchAvatar extends React.Component{
    state = {
        mySearch:null
    }

    getInput = (e) => {
        this.props.onChange(e.target.value);
    }

    render(){
        return (
            <div className="search">
                <input type="text" onChange={this.getInput}></input>
            </div>
        );
    }
}


export default SearchAvatar;
