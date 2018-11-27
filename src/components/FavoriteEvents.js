import React, { Component } from 'react';
import '../css/App.css';
import NavBar from './NavBar'
import request from 'then-request'

const styles = {
  event: {
    height: "400px",
    width: "350px",
    display: "block",
    float: "left",
    padding: "10px",
    margin: "20px",
    border: '1px black solid'
  },
  eventImg: {
    height: "200px",
    width: "300px",
    margin: "15px"
  }
}

class FavoriteEvents extends Component {
  constructor() {
		super();

		// Initial state
		this.state = {
			dataRetrieved: false,
      activeTab: 1
		};

		// Bind all functions so they can refer to "this" correctly
		this.changeActive = this.changeActive.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.mapArray = this.mapArray.bind(this);
    this.updateFromLocalStorageData = this.updateFromLocalStorageData.bind(this);
	}

  componentWillMount() {
    request('GET', 'assets/data/activities.json', {json: true}).done((res)=> {
      //var response = JSON.parse(res.getBody());
      //this.setState(response);
      this.setState({"activities":[]});
      console.log("componentWillMount");
      this.updateFromLocalStorageData();
      this.setState({"outdoorActivities": this.getActivities("outdoor")});
      this.setState({"indoorActivities": this.getActivities("indoor")});
      this.setState({"otherActivities": this.getActivities("others")});
      this.setState({"dataRetrieved": true});
      console.log(this.state.activities);
    });
  }

  updateFromLocalStorageData() {
    let activities = this.state.activities;
    let storedArray = [];
    if(localStorage["favorite"] !== undefined) {
      storedArray = JSON.parse(localStorage['favorite']);
    }
    for(let index = 0; index < storedArray.length; index++) {
      let item = storedArray[index];
      activities.unshift(item);
    }
  }

  getActivities(filter) {
    let activities = this.state.activities;
    let result = [];
    if(activities !== undefined) {
      for(let index = 0; index < activities.length; index++) {
        let item = activities[index];
        if(item["category"]===filter) {
          result.push(item);
        }
      }
    }
    return result;
  }

  changeActive(number, second, third) {
    this.setState({"activeTab": number});
  }

  mapArray(array) {
    if(array !== undefined) {
      return array.map((item, i) => {
        return(
          <div key={i} style={styles.event}>
            <img src={item["img"]} alt="/" style={styles.eventImg}/>
            <div style={{marginLeft:20+'px'}}>
              <span style={{fontWeight:"bold"}}>Activity Name:</span> {item["name"]}<br/>
              <span style={{fontWeight:"bold"}}>Category:</span> {item["category"]}<br/>
              {item["num"]!==undefined?
              (<span><span style={{fontWeight:"bold"}}>Suggested of People:</span> {item["num"][0]}-{item["num"][1]}<br/></span>)
              :""}
              <span style={{fontWeight:"bold"}}>Equipment Needed:</span> {
                item["equipment"].map((item2, i2)=>{
                  if(i2===item["equipment"].length-1)
                    return(item2)
                  else
                    return(item2 + ", ")})
                  }<br/>
              <span style={{fontWeight:"bold"}}>Description:</span> {item["description"]}<br/>
            </div>
          </div>
        );
      });
    }
    else {
      return(
        <div></div>
      );
    }
  }

  render() {
    var allActivities = this.state.dataRetrieved?this.state.activities:[];
    const allCards = this.mapArray(allActivities);
    var outdoorActivities = this.state.dataRetrieved?this.state.outdoorActivities:[];
    const outdoorCards = this.mapArray(outdoorActivities);
    var indoorActivities = this.state.dataRetrieved?this.state.indoorActivities:[];
    const indoorCards = this.mapArray(indoorActivities);
    var otherActivities = this.state.dataRetrieved?this.state.otherActivities:[];
    const otherCards = this.mapArray(otherActivities);
    return (
      <div>
        <NavBar/>
        <div className="container" style={{marginTop:200+"px", marginBottom:40+"px"}}>
          <h1>Events Your Family All Liked</h1>
        </div>
        <section>
      <div className="container">
        <div>
          <ul className="nav nav-tabs" role="tablist">
            <li role="presentation" className={this.state.activeTab===1?"active":""}><a href="#all" aria-controls="all" role="tab" data-toggle="tab" onClick={() => this.changeActive(1)}>All Activities</a></li>
            <li role="presentation" className={this.state.activeTab===2?"active":""}><a href="#one" aria-controls="one" role="tab" data-toggle="tab" onClick={() => this.changeActive(2)}>Outdoor Activities</a></li>
            <li role="presentation" className={this.state.activeTab===3?"active":""}><a href="#two" aria-controls="two" role="tab" data-toggle="tab" onClick={() => this.changeActive(3)}>Indoor Activities</a></li>
            <li role="presentation" className={this.state.activeTab===4?"active":""}><a href="#three" aria-controls="three" role="tab" data-toggle="tab" onClick={() => this.changeActive(4)}>Others</a></li>
          </ul>
          <br />

          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="all">
              <div className="row">
                {this.state.dataRetrieved?allCards:<div></div>}
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="one">
              <div className="row">
                {this.state.dataRetrieved?outdoorCards:<div></div>}
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="two">
              <div className="row">
                {this.state.dataRetrieved?indoorCards:<div></div>}
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="three">
              <div className="row">
                {this.state.dataRetrieved?otherCards:<div></div>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
      </div>
    );
  }
}

export default FavoriteEvents;
