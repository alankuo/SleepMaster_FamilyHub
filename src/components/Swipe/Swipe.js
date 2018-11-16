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
import backIcon from '../../img/back.png'
import favoritesIcon from '../../img/favorites.png'
import {Link} from 'react-router-dom'
// import {
//   CSSTransition,
//   TransitionGroup,
// } from 'react-transition-group';
import request from 'then-request'
import { setTimeout } from 'timers';
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
      comments:[],
    };

    this.current = React.createRef();


    this.renderCards = this.renderCards.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.drop = this.drop.bind(this);
    this.detail = this.detail.bind(this);

    this.slide = this.slide.bind(this);
    this.reset = this.reset.bind(this);
    this.undo = this.undo.bind(this);

    this.goback = this.goback.bind(this)
    this.handleInformClick = this.handleInformClick.bind(this);
    this.handleInformOutClick = this.handleInformOutClick.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);

  }

  componentWillMount() {

    setTimeout((function() {
      const response = Database.getMatches(20);
      const arr = [];

      for(let i=0; i < response.length; i++) {
        const activity = response[i];
        arr.push(new CardInfo(activity.name, activity.img, activity.num,activity.category, activity.equipment, activity.description, activity.comments))
      }
      this.setState({...this.state, cards: arr, current: arr.length - 1});

    }).bind(this),500);
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
  undo() {

    if(this.state.cards.length == 0) {
      return ;
    }
    let prev = this.state.current + 1;
    prev = prev >= this.state.cards.length ? this.state.cards.length - 1: prev;
    prev = prev >= 0 ? prev : 0;
    console.log(prev, this.state.cards)
    this.state.cards[prev].x = 0;
    this.state.cards[prev].y = 0;
    this.state.cards[prev].rotate = 0;

    this.setState({...this.state, ...this.state, update: !this.state.update, current: prev})

  }

  startDrag(e) {
    if(this.state.cards[this.state.current].x < 0) {
      console.log(this.state.cards[this.state.current].x)
    }
    e.dataTransfer.setDragImage(new Image(0,0), 0, 0);
    this.x = e.screenX;
    this.y = e.screenY;
  }

  drag(e) {

    if(e.screenX == 0) {
      // some bug of 'screenX of last drag before drop is always 0' on react
      return;
    }
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
    const maxDegree = 8;
    let rotate = - (e.screenX - this.x) / 100 * maxDegree;

    if(rotate > maxDegree) {
      window.requestAnimationFrame(this.slide)
      Database.setVisited();
    } else if (rotate < -maxDegree) {
      window.requestAnimationFrame(this.slide)
      Database.setLike(this.state.cards[this.state.current]);
      Database.setVisited();
    } else {
      window.requestAnimationFrame(this.reset)
    }


  }

  /*********** Navigation ******************/
  detail() {
    window.location = "#/event-details";
  }



  /************ Animation ******************/
  slide(timestamp) {
    if (!this.start) this.start = timestamp;
    const progress = timestamp - this.start;

    const e = this.state.cards[this.state.current]
    const xSpeed = 10;
    const ySpeed = 1;

    const x = e.x < 0 ? e.x - (progress * xSpeed) : e.x + (progress * xSpeed)
    const y = e.y < 0 ? e.y - (progress * ySpeed) : e.y + (progress * ySpeed)
    const transform = `translateX(-50%) translate(${x}px,${y}px) rotate(${e.rotate}deg)`
    console.log(e.ref)
    e.ref.current.style.transform = transform;

    if (progress < 4000 / xSpeed) {
      window.requestAnimationFrame(this.slide);
    } else {
      const currentCard = this.state.cards;
      currentCard[this.state.current].x = x;
      currentCard[this.state.current].y = y;
      this.setState({...this.state, update: !this.state.update, current: this.state.current - 1});
      this.start = null
    }
  }

  reset(timestamp) {
    if (!this.start) this.start = timestamp;
    const progress = timestamp - this.start;

    const e = this.state.cards[this.state.current]
    const xSpeed = 10;
    const ySpeed = 1;

    let x;
    if(e.x < 0) {
      x = e.x + (progress * xSpeed)
      x = x > 0 ? x : 0;
    } else {
      x = e.x - (progress * xSpeed)
      x = x < 0 ? x : 0;
    }

    let y;
    if(e.y < 0) {
      y = e.x + (progress * ySpeed)
      y = y > 0 ? y : 0;
    } else {
      y = e.y - (progress * ySpeed)
      y = y < 0 ? y : 0;
    }

    let rotate;
    if(e.rotate < 0) {
      rotate = e.rotate + (progress * xSpeed)
      rotate = rotate > 0 ? rotate : 0;
    } else {
      rotate = e.rotate - (progress * xSpeed)
      rotate = rotate < 0 ? rotate : 0;
    }

    const transform = `translateX(-50%) translate(${x}px,${y}px) rotate(${rotate}deg)`
    e.ref.current.style.transform = transform;

    if ((x != 0 || y != 0) && (progress < 4000 / xSpeed)) {
      window.requestAnimationFrame(this.slide);
    } else {
      const currentCard = this.state.cards;
      currentCard[this.state.current].x = 0;
      currentCard[this.state.current].y = 0;
      currentCard[this.state.current].rotate = 0;
      this.setState({...this.state, update: !this.state.update, release: !this.state.release});
      this.start = null
    }
  }

  goback() {
    this.setState({...this.state, inform: !this.state.inform})
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

    let dislikeTutorial =
      <div style={{top: '30%', left: '50%', position:'fixed', transform: 'translate(-60vh,0) translateX(-50%)', zIndex: '10'}}>
        <p style={{marginLeft: 170+'px', fontWeight:'bold', fontSize:20+'px'}}>SWIPE LEFT TO DISLIKE</p><br/>
        <img className="swipe-img" style={{marginLeft: "190px", width:150+'px'}} src={swipeLeft} alt={swipeLeft} />
      </div>;
    let likeTutorial =
      <div style={{top: '30%',left: '50%', position:'fixed', transform: 'translate(60vh,0) translateX(-50%)',zIndex: '10'}}>
        <p style={{marginRight: 160+'px', fontWeight:'bold', fontSize:20+'px'}}>SWIPE RIGHT TO LIKE</p><br/>
        <img className="swipe-img" style={{marginLeft:10+'px'}} src={swipeRight} alt={swipeRight} />
      </div>;

    let informButton;
    let returnDiv;

    if (!inform) {
      informButton =<img className="swipe-card-info" src={infoIcon} alt={infoIcon} onClick={this.handleInformClick}/>;
      returnDiv =
        <div>
          {dislikeTutorial}
          <img src={backIcon} className="swipe-back" onClick={this.undo}/>
          <h1 className="swipe-back-text"> Undo </h1>
          <Link to="/favorite-event" ><img src={favoritesIcon} className="swipe-favorite"/></Link>
          <h1 className="swipe-favorite-text"> Favorites </h1>
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

                      ref={e.ref}
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
                        </h4>

                        <h6> <div className="swipe-people glyphicon glyphicon-user"> </div> {e.suggestPeople[0]} - {e.suggestPeople[1]}</h6>
                        <h6 className="swipe-type">{e.type}</h6>
                        <h6 >Need: {e.stuffs}</h6>
                      </div>
                    </div>

                )
              }
        </div>
        {likeTutorial}
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
                  ref={e.ref}
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
                    <h6 >Need: {e.stuffs} </h6>
                    <h6> Description: {e.descript}</h6>
                  </div>
                </div>
              )
            }
          </div>
          <div className="col-lg-5" style={{left:'50%'}}>
            <div className="columns">
              <Comments comments={this.state.cards[this.state.current].comment.reverse()} />
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
  constructor(title, image, suggestPeople, type, stuffs, descript, comment ) {
    this.title = title;
    this.image = image;
    this.suggestPeople = suggestPeople;
    this.type = type;
    this.stuffs = stuffs;
    this.x = 0;
    this.y = 0;
    this.rotate = 0;
    this.ref = React.createRef();
    this.comment = comment;
    this.descript = descript;
  }

  json() {
    return {"name":this.title, "num":this.suggestPeople, "category":this.type, "equipment":this.stuffs,"img":this.image, "comments":this.comment, "description": this.descript }
  }


}

export default Swipe;
