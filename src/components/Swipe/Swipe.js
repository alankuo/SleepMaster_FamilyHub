import React, { Component } from 'react';
import eventPhoto from '../../img/bike.png';
import infoIcon from '../../img/info.png'
import './Swipe.css';
import NavBar from '../NavBar.js';
import {Link} from 'react-router-dom';
import dislike from '../../img/dislike_icon.png';
import like from '../../img/like_icon.png';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import request from 'then-request'

class Swipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: [
      ],
      current: -1,
      update: true,
      release: false,
    }

    this.renderCards = this.renderCards.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.drop = this.drop.bind(this);
    this.detail = this.detail.bind(this);
  }

  componentWillMount() {
    request('GET', '/assets/data/activities.json', {json: true}).done((res)=> {
      var response = JSON.parse(res.getBody());
      const arr = [];
      for(let i=0; i < response.activities.length; i++) {
        const activity = response.activities[i];
        arr.push(new CardInfo(activity.name, activity.img, activity.num,activity.category, activity.equipment))
      }
      console.log(arr);

      this.setState({...this.state, cards: arr, current: arr.length - 1});
    });
  }


  /************* cards render ************/
  renderCards() {

  }


  /************* card Interaction *************/
  startDrag(e) {
    console.log("start drag");
    e.dataTransfer.setDragImage(new Image(0,0), 0, 0);
    this.x = e.screenX;
    this.y = e.screenY;
  }

  drag(e) {
    console.log("drag");
    console.log(this.state.cards[this.state.current].x);
    var tmp =this.state.cards[this.state.current];
    this.state.cards[this.state.current].x = e.screenX - this.x;
    this.state.cards[this.state.current].y = e.screenY - this.y;

    const maxDegree = 8;
    let rotate = - (e.screenX - this.x) / 100 * maxDegree;
    if(rotate > maxDegree) {
      rotate = maxDegree;
    } else if (rotate < -maxDegree) {
      rotate = -maxDegree;
    }
    this.state.cards[this.state.current].rotate = rotate;

    this.setState({...this.state, cards: this.state.cards});
  }

  drop(e) {
    console.log("drop", this.state.cards[this.state.current].rotate);

    const maxDegree = 8;
    let rotate = - (e.screenX - this.x) / 100 * maxDegree;
    if(rotate > maxDegree) {
      this.state.cards[this.state.current].x = -20000;
      this.state.cards[this.state.current].y = 0;
      this.setState({...this.state, update: !this.state.update, current: this.state.current - 1});
    } else if (rotate < -maxDegree) {
      this.state.cards[this.state.current].x = 20000;
      this.state.cards[this.state.current].y = 0;
      this.setState({...this.state, update: !this.state.update, current: this.state.current - 1});
      this.like(this.state.cards[this.state.current]);
    } else {
      this.state.cards[this.state.current].x = 0;
      this.state.cards[this.state.current].y = 0;
      this.state.cards[this.state.current].rotate = 0;
      this.setState({...this.state, update: !this.state.update, release: !this.state.release});
    }


  }

  /*********** Navigation ******************/
  detail() {
    window.location = "#/event-detail";
  }

  like(card) {
    let arr = localStorage.getItem('favorite');
    if(arr == null) {
      arr = []
    } else {
      arr = JSON.parse(arr);
    }
    arr.push(card.json());
    localStorage.setItem('favorite', JSON.stringify(arr));


  }

  render() {
    return (
      <div>
        <NavBar />
          <div className="swipe">
              {
                this.state.cards.map((e, i) =>
                    <div
                      key={i}
                      className="swipe-card"
                      style={{
                        transform: `translateX(-50%) translate(${e.x + ((this.state.current - i) * 8)}px, ${e.y + ((this.state.current - i) * 8)}px) rotate(${e.rotate}deg)`,
                        display: `${i <= this.state.current + 1 && i >= this.state.current - 1 ? "block" : "none"}`
                      }}
                      onDragStart={this.startDrag}
                      onDrag={this.drag}
                      onDragEnd={this.drop}
                      draggable={this.state.current === i ? "true" : "false"}

                    >
                      <img className="swipe-card-dislike" src={dislike} style={{opacity: e.rotate / 5}} draggable="false"/>
                      <img className="swipe-card-like" src={like} style={{opacity: -e.rotate / 5}} draggable="false"/>
                      <img className="swipe-card-image" src={e.image} draggable="false"
                        onClick={this.detail}/>

                      <div className="swipe-card-bot">
                        <h4 className="swipe-card-title">{e.title} <img className="swipe-card-info" src={infoIcon}
                            onClick={this.detail}
                          />
                        </h4>

                        <h6> <div className="swipe-people glyphicon glyphicon-user"> </div> {e.suggestPeople[0]} - {e.suggestPeople[1]}</h6>
                        <h6 className="swipe-type">{e.type}</h6>
                        <h6 >Need: {e.stuffs}</h6>
                      </div>
                    </div>

                )
              }

        </div>
      </div>
    );
  }
}

class CardInfo {
  constructor(title, image, suggestPeople, type, stuffs) {
    this.title = title;
    this.image = image;
    this.suggestPeople = suggestPeople;
    this.type = type;
    this.stuffs = stuffs;
    this.x = 0;
    this.y = 0;
    this.rotate = 0;
  }

  json() {
    return {"name":this.title, "num":this.suggestPeople, "category":this.type, "equipment":this.stuffs,"img":this.image}
  }


}

export default Swipe;
