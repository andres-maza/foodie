import React, { Component } from 'react';
import { Link } from 'react-router';
import update from 'react-addons-update';

import LoadingAnim from '../LoadingAnim';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {},
      weather: {
        weather: [
          {
            id: 0
          }
        ]
      },
      term: '',
      delivery: 0,
      food_options: {
        rain: [
          {
            term: 'Soup Dumplings',
            emoji_a: ''
          },
          {
            term: 'Comfort Food',
            emoji_a: ''
          },
          {
            term: 'Ramen',
            emoji_a: ''
          },
          {
            term: 'Pizza',
            emoji_a: ''
          },
          {
            term: 'Mexican',
            emoji_a: ''
          }
        ],
        snow: [
          {
            term: 'Soup Dumplings',
            emoji_a: ''
          },
          {
            term: 'Ramen',
            emoji_a: ''
          },
          {
            term: 'Pizza',
            emoji_a: ''
          },
          {
            term: 'Italian',
            emoji_a: ''
          },
          {
            term: 'Comfort Food',
            emoji_a: ''
          }
        ],
        clear: [
          {
            term: 'Burgers',
            emoji_a: 'white'
          },
          {
            term: 'Hot Dogs',
            emoji_a: 'green'
          },
          {
            term: 'BBQ',
            emoji_a: 'blue'
          },
          {
            term: 'Sushi',
            emoji_a: 'red'
          },
          {
            term: 'Tacos',
            emoji_a: 'yellow'
          }
        ]
      },
      heading: '',
      emoji_bg_img: {
        backgroundColor: 'blue'
      }
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({position: position.coords});

      fetch(`http://localhost:8000/api/weather/${this.state.position.latitude}/${this.state.position.longitude}`, {
        method: 'GET'
      })
      .then((results) => {
        results.json().then((data) => {
          // Set the state of 'weather' to be the value of 'data'
          this.setState({weather: data});
          // Store the id of 'weather' in a variable to be used sporadically
          let weatherId = data.weather[0].id;
          let currentTemp = data.main.temp;
          // Get array of messages for later use
          let foodOpts = this.state.food_options;
          // If else statements for each weather condition
          if ((weatherId >= 300 && weatherId < 600) || (weatherId >= 700 && weatherId < 800)) {
            // Checks for 'Rain' or 'Atmosphere'
            let selectedTerm = foodOpts.rain[Math.floor(Math.random() * foodOpts.rain.length)].term;
            this.setState({
              delivery: 1,
              term: `${selectedTerm}`,
              heading: `Hey, looks like it might rain today. How \'bout ${selectedTerm.toLowerCase()} for delivery?`
            });
          } else if (weatherId >= 600 && weatherId < 700) {
            // Checks for 'Snow'
            let selectedTerm = foodOpts.snow[Math.floor(Math.random() * foodOpts.snow.length)].term;
            this.setState({
              delivery: 1,
              term: `${selectedTerm}`,
              heading: `Hey, looks like it might snow today. How \'bout ${selectedTerm.toLowerCase()} for delivery?`
            });
          } else if ((weatherId >= 800 && weatherId < 900) || (weatherId >= 950 && weatherId <= 955) && currentTemp > 40) {
            // Checks for 'Clear' or 'Clouds'
            let selectedTerm = foodOpts.clear[Math.floor(Math.random() * foodOpts.clear.length)];
            this.setState({
              delivery: 0,
              term: `${selectedTerm.term}`,
              emoji_bg_img: {
                backgroundColor: `${selectedTerm.emoji_a}`
              },
              heading:`Hey look, it's nice out! How \'bout ${selectedTerm.term.toLowerCase()}?`
            });
          }
          // Continue else if statements for weather here...
        });
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      })
    })
  }

  getNewOption() {
    let weatherId = this.state.weather.weather[0].id;
    let currentTemp = this.state.weather.main.temp;
    let foodOpts = this.state.food_options;

    if ((weatherId >= 300 && weatherId < 600) || (weatherId >= 700 && weatherId < 800)) {
      let selectedTerm = foodOpts.rain[Math.floor(Math.random() * foodOpts.rain.length)].term;
      this.setState({
        term: `${selectedTerm}`,
        heading: `Hey look, like it might rain today. How \'bout ${selectedTerm.toLowerCase()} for delivery?`
      });
    } else if (weatherId >= 600 && weatherId < 700) {
      let selectedTerm = foodOpts.snow[Math.floor(Math.random() * foodOpts.snow.length)].term;
      this.setState({
        term: `${selectedTerm}`,
        heading: `Hey look, like it might snow today. How \'bout ${selectedTerm.toLowerCase()} for delivery?`
      });
    } else if ((weatherId >= 800 && weatherId < 900) || (weatherId >= 950 && weatherId <= 955) && currentTemp > 40) {
      let selectedTerm = foodOpts.clear[Math.floor(Math.random() * foodOpts.clear.length)];
      this.setState({
        term: `${selectedTerm.term}`,
        emoji_bg_img: {
          backgroundColor: `${selectedTerm.emoji_a}`
        },
        heading:`Hey look, it's nice out! How \'bout ${selectedTerm.term.toLowerCase()}?`
      });
    }
  }

  render() {
    return(
      <div className="container">
        <LoadingAnim
          display="visibile"
        />
        <div className="hp-content">
          <h1>{this.state.heading}</h1>
          <Link to={`/results/${this.state.position.latitude}/${this.state.position.longitude}?term=${this.state.term}&delivery=${this.state.delivery}`}>
            <button className="standard-btn">Search for {this.state.term}</button>
          </Link>
          <button className="standard-btn" onClick={this.getNewOption.bind(this)}>Give me another option</button>
        </div>
        <div className="spinning-emoji-container">
          <div className="emoji_one" style={this.state.emoji_bg_img}></div>
          <div className="emoji_two" style={this.state.emoji_bg_img}></div>
          <div className="emoji_three" style={this.state.emoji_bg_img}></div>
          <div className="emoji_four" style={this.state.emoji_bg_img}></div>
        </div>
      </div>
    );
  }
}

export default Homepage;
