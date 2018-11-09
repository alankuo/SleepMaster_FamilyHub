import React, { Component } from 'react';
import '../css/App.css';
import NavBar from './NavBar'
import request from 'then-request'

const styles = {
  event: {
    height: "350px",
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
	}

  componentWillMount() {
    request('GET', 'assets/data/activities.json', {json: true}).done((res)=> {
      var response = JSON.parse(res.getBody());
      this.setState(response);
      this.setState({"dataRetrieved": true});
      console.log(this.state.activities);
    });
  }

  changeActive(number, second, third) {
    this.setState({"activeTab": number});
    console.log(number);
    console.log(second);
    console.log(third);
  }

  render() {
    var temp = this.state.dataRetrieved?this.state.activities:[];
    const card = temp.map((item, i) =>
      <div key={i} style={styles.event}>
        <img src={item["img"]} alt="/" style={styles.eventImg}/>
        <p style={{marginLeft:20+'px'}}>Activity Name: {item["name"]}<br/>
        Category: {item["category"]}<br/>
        Suggested of People: {item["num"]}<br/>
        {item["description"]}<br/></p>
      </div>
    );
    return (
      <div>
        <NavBar/>
        <div className="container" style={{marginTop:100+"px", marginBottom:40+"px"}}>
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
                {this.state.dataRetrieved?card:<div></div>}
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="one">
              <div className="row">
              Outdoor TBD...
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="two">
              <div className="row">
              Indoor TBD...
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="three">
              <div className="row">
              Others TBD...
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
