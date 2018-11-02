import React, { Component } from 'react';
import searchIcon from '../../img/magnifier-tool.png';
import addIcon from '../../img/add.png';
import favorite from '../../img/favorite.png';
import {Link} from 'react-router-dom';

const navigation=['/discover-event', '/create-event', '/favorite-event']
const icons = [searchIcon, addIcon, favorite];
const styles = {
    card: {
        width:'100%',
        height: '100%',
        border: '1px solid black',

        padding: '20px'
    },
    iconSection: {
        padding: '50px',
        marginTop: '80px'
    },
    icon: {
        width:'100%',
    }
}
class Card extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div style={styles.card}>
                <div style={styles.iconSection}>
                    <Link to={`${navigation[this.props.icon]}`}><img src={icons[this.props.icon]} style={styles.icon} /></Link>
                </div>
            </div>

        );
    }
}

export default Card;