import React, { Component } from 'react';
import infoIcon from '../../img/info.png'
import closeIcon from '../../img/close_icon.png'
import './Swipe.css';
import NavBar from '../NavBar.js';
import dislike from '../../img/dislike_icon.png';
import like from '../../img/like_icon.png';
import swipeLeft from '../../img/swipe-left.png';
import swipeRight from '../../img/swipe-right.png';
import Database from '../../util/Database'
// import {
//   CSSTransition,
//   TransitionGroup,
// } from 'react-transition-group';
import request from 'then-request'
import Comments from '../EventDetails/Comments'
import CommentBox from '../EventDetails/CommentBox'


class Swipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: [
      ],
      current: -1,
      update: true,
      release: false,
      inform: false,
      comments: [{name: "Lan Wang", comment: "Really enjoy it with my family!"}
        ,{name: "Yuhan Wang", comment: "Like it!"}],
    }

    this.renderCards = this.renderCards.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.drop = this.drop.bind(this);
    this.detail = this.detail.bind(this);
    this.handleInformClick = this.handleInformClick.bind(this);
    this.handleInformOutClick = this.handleInformOutClick.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
  }

  componentWillMount() {
    request('GET', 'assets/data/activities.json', {json: true}).done((res)=> {
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

  componentDidMount() {
    /*global Ably*/
    const channel = Ably.channels.get('comments');

    channel.attach();
    channel.once('attached', () => {
      channel.history((err, page) => {
        // create a new array with comments only in an reversed order (i.e old to new)
        const comments = Array.from(page.items.reverse(), item => item.data)

        this.setState({ comments });
      });
    });
  }

  handleAddComment(comment) {
    this.setState(prevState => {
      return {
        comments: prevState.comments.concat(comment)
      };
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
    var currentCard =this.state.cards;
    currentCard[this.state.current].x = e.screenX - this.x;
    currentCard[this.state.current].y = e.screenY - this.y;

    const maxDegree = 8;
    let rotate = - (e.screenX - this.x) / 100 * maxDegree;
    if(rotate > maxDegree) {
      rotate = maxDegree;
    } else if (rotate < -maxDegree) {
      rotate = -maxDegree;
    }
    currentCard[this.state.current].rotate = rotate;

    this.setState({...this.state, cards: currentCard});
  }

  drop(e) {
    console.log("drop", this.state.cards[this.state.current].rotate);

    const maxDegree = 8;
    let rotate = - (e.screenX - this.x) / 100 * maxDegree;
    var currentCard = this.state.cards;
    if(rotate > maxDegree) {
      currentCard[this.state.current].x = -20000;
      currentCard[this.state.current].y = 0;
      this.setState({...this.state, cards: currentCard, update: !this.state.update, current: this.state.current - 1});
    } else if (rotate < -maxDegree) {
      currentCard[this.state.current].x = 20000;
      currentCard[this.state.current].y = 0;
      this.setState({...this.state, cards: currentCard, update: !this.state.update, current: this.state.current - 1});
      Database.setLike(this.state.cards[this.state.current]);
    } else {
      currentCard[this.state.current].x = 0;
      currentCard[this.state.current].y = 0;
      currentCard[this.state.current].rotate = 0;
      this.setState({...this.state, cards: currentCard, update: !this.state.update, release: !this.state.release});
    }


  }

  /*********** Navigation ******************/
  detail() {
    window.location = "#/event-details";
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

  handleInformClick() {
    this.setState({inform: true});
  }

  handleInformOutClick() {
    this.setState({inform: false});
  }

  render() {

    const inform = this.state.inform;

    let informButton;
    let returnDiv;

    if (!inform) {
      informButton =<img className="swipe-card-info" src={infoIcon} alt={infoIcon} onClick={this.handleInformClick}/>;
      returnDiv =
        <div>
          <div style={{marginTop: 270+'px',float:'left'}}>
            <p style={{marginLeft: 170+'px', fontWeight:'bold', fontSize:20+'px'}}>SWIPE LEFT TO DISLIKE</p><br/>
            <img className="swipe-img" style={{marginLeft: "190px", width:150+'px'}} src={swipeLeft} alt={swipeLeft} />
          </div>
          <div className="swipe" style={{position: 'fixed'}}>
            {
              this.state.cards.map((e, i) =>
                <div
                  key={i}
                  className="swipe-card"
                  style={{
                    left:'50%',
                    position: 'fixed',
                    transform: `translateX(-50%) translate(${e.x + ((this.state.current - i) * 8)}px, ${e.y + ((this.state.current - i) * 8)}px) rotate(${e.rotate}deg)`,
                    display: `${i <= this.state.current + 1 && i >= this.state.current - 1 ? "block" : "none"}`
                  }}
                  onDragStart={this.startDrag}
                  onDrag={this.drag}
                  onDragEnd={this.drop}
                  draggable={this.state.current === i ? "true" : "false"}

                >
                  <img className="swipe-card-dislike" src={dislike} alt={dislike} style={{opacity: e.rotate / 5}} draggable="false"/>
                  <img className="swipe-card-like" src={like} alt={like} style={{opacity: -e.rotate / 5}} draggable="false"/>
                  <img className="swipe-card-image" src={e.image} alt={e.image} draggable="false"
                       onClick={this.handleInformClick}/>

                  <div className="swipe-card-bot">
                    <h4 className="swipe-card-title">{e.title}
                      {informButton}
                      {/*<img className="swipe-card-info" src={infoIcon} alt={infoIcon} onClick={this.detail}/>*/}
                    </h4>

                    <h6> <div className="swipe-people glyphicon glyphicon-user"> </div> {e.suggestPeople[0]} - {e.suggestPeople[1]}</h6>
                    <h6 className="swipe-type">{e.type}</h6>
                    <h6 >Need: {e.stuffs}</h6>
                  </div>
                </div>

              )
            }
          </div>
          <div style={{marginTop: 270+'px',float:'right'}}>
            <p style={{marginRight: 160+'px', fontWeight:'bold', fontSize:20+'px'}}>SWIPE RIGHT TO LIKE</p><br/>
            <img className="swipe-img" style={{marginLeft:10+'px'}} src={swipeRight} alt={swipeRight} />
          </div>
        </div>
    } else {
      informButton = <img className="swipe-card-info" src={closeIcon} alt={closeIcon} onClick={this.handleInformOutClick}/>
      returnDiv =
        <div>
          <div className="col-lg-1">
            <button style={{left:"0%", marginTop:"100%"}} type="button" className="btn btn-default btn-lg glyphicon glyphicon-arrow-left" onClick={this.goback}/>
          </div>
          <div className="swipe" >
          {
              this.state.cards.map((e, i) =>
                <div
                  key={i}
                  className="swipe-card"
                  style={{
                    left:'30%',
                    transform: `translateX(-50%) translate(${e.x + ((this.state.current - i) * 8)}px, ${e.y + ((this.state.current - i) * 8)}px) rotate(${e.rotate}deg)`,
                    display: `${i <= this.state.current && i >= this.state.current - 1 ? "block" : "none"}`
                  }}
                  onDragStart={this.startDrag}
                  onDrag={this.drag}
                  onDragEnd={this.drop}
                  draggable={"false"}
                >
                  <img className="swipe-card-dislike" src={dislike} alt={dislike} style={{opacity: e.rotate / 5}} draggable="false"/>
                  <img className="swipe-card-like" src={like} alt={like} style={{opacity: -e.rotate / 5}} draggable="false"/>
                  <img className="swipe-card-image" src={e.image} alt={e.image} draggable="false"/>
                       {/*onClick={this.handleInformOutClick}/>*/}

                  <div className="swipe-card-bot">
                    <h4 className="swipe-card-title">{e.title}
                      {informButton}
                    </h4>

                    <h6> <div className="swipe-people glyphicon glyphicon-user"> </div> {e.suggestPeople[0]} - {e.suggestPeople[1]}</h6>
                    <h6 className="swipe-type">{e.type}</h6>
                    <h6 >Need: {e.stuffs}</h6>
                  </div>
                </div>
              )
            }
          </div>
          <div className="col-lg-5" style={{left:'50%'}}>
            <div className="columns">
              <Comments comments={this.state.comments.reverse()} />
              <CommentBox handleAddComment={this.handleAddComment} />
            </div>
          </div>
        </div>
    }

    return (
      <div>
        <NavBar />
        {returnDiv}
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
