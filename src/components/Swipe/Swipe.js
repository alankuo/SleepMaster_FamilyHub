import React, { Component } from 'react';
import eventPhoto from '../../img/bike.png'
import './Swipe.css';
import NavBar from '../NavBar.js';
import {Link} from 'react-router-dom';

class Swipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: [
        new CardInfo(),
        new CardInfo(),
        new CardInfo(),
        new CardInfo(),
        new CardInfo(),
      ],
      current: 4,
      update: true,
    }

    this.renderCards = this.renderCards.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.drop = this.drop.bind(this);
  }

  componentWillMount() {

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
    } else {
      this.state.cards[this.state.current].x = 0;
      this.state.cards[this.state.current].y = 0;
      this.state.cards[this.state.current].rotate = 0;
      this.setState({...this.state, update: !this.state.update});
    }


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
                  <img className="swipe-card-image" src={eventPhoto} draggable="false"></img>
                  <div className="swipe-card-bot">
                    <h1>Riding bike</h1>
                    <div className="swipe-people glyphicon glyphicon-user"> 2-3</div>
                    <h4 className="swipe-type">Outdoor</h4>
                    <h4 >Need: bike</h4>
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
  constructor() {
    this.title = "bike";
    this.image = eventPhoto;
    this.suggestPeople = [2, 3];
    this.type = "Outdoor";
    this.stuffs = "bike";
    this.x = 0;
    this.y = 0;
    this.rotate = 0;
  }


}

export default Swipe;
