import React, { Component } from 'react';
import searchIcon from '../../img/magnifier-tool.png';
import addIcon from '../../img/add.png';
import favorite from '../../img/favorite.png';
import {Link} from 'react-router-dom';

const navigation=['/discover-event', '/create-event', '/favorite-event']
const icons = [searchIcon, addIcon, favorite];
const texts = ['Explore', 'Create', 'Favorites']
class Card extends Component {

    render() {
        return (
            <Link className="card-link" to={`${navigation[this.props.icon]}`}>
                <div className="card">
                    <img className="card-img center-block" src={icons[this.props.icon]} alt={icons[this.props.icon]}/>
                    <h1 className="card-name">{texts[this.props.icon]}</h1>

                </div>
            </Link>

        );
    }
}

export default Card;
