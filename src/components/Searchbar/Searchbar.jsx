import React, { Component } from "react";
import css from './Searchbar.module.css';
import { AiOutlineSearch } from "react-icons/ai";
import PropTypes from 'prop-types';

class Searchbar extends Component{
  state = {
    pictureName: '',
  };

  handleNameChange = e => {
    this.setState({ pictureName: e.currentTarget.value.toLowerCase() });
  };

  handelSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.pictureName);
    this.setState({ pictureName: '' });
    
  };

    render() {
      
        return (
           <header className={css.Searchbar}>
            <form onSubmit={this.handelSubmit} className={css.SearchForm}>
              
              <button className={css.SearchForm_button}
                  type="submit" >
                  <AiOutlineSearch />  
              </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            name="pictureName"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.pictureName}
            onChange={this.handleNameChange}
          />
        </form>
      </header> 
        );
    };
};

Searchbar.propType = {
  props:PropTypes.func.isRequired,
}

export default Searchbar;