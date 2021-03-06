import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';


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
            term: 'Sushi',
            class: 'sushi-emoji'
          },
          {
            term: 'Comfort Food',
            class: 'comfort-food-emoji'
          },
          {
            term: 'Ramen',
            class: 'ramen-emoji'
          },
          {
            term: 'Pizza',
            class: 'pizza-emoji'
          },
          {
            term: 'Mexican Food',
            class: 'mexican-food-emoji'
          }
        ],
        snow: [
          {
            term: 'Soup Dumplings',
            class: 'soup-dumpling-emoji'
          },
          {
            term: 'Ramen',
            class: 'ramen-emoji'
          },
          {
            term: 'Pizza',
            class: 'pizza-emoji'
          },
          {
            term: 'Italian Food',
            class: 'italian-food-emoji'
          },
          {
            term: 'Comfort Food',
            class: 'comfort-food-emoji'
          }
        ],
        clear: [
          {
            term: 'Burgers',
            class: 'burgers-emoji'
          },
          {
            term: 'Hot Dogs',
            class: 'hot-dogs-emoji'
          },
          {
            term: 'BBQ',
            class: 'bbq-emoji'
          },
          {
            term: 'Sushi',
            class: 'sushi-emoji'
          },
          {
            term: 'Tacos',
            class: 'tacos-emoji'
          }
        ]
      },
      heading: '',
      emoji_class_name: '',
      loadIcon: true,
      isLoaded: {
        display: 'none'
      }
    }
  }

  getNewOption() {
    // Set weather id and current temperature for sporadic use.
    let weatherId = this.state.weather.weather[0].id;
    let currentTemp = ((this.state.weather.main.temp * 9) / 5) - 459.67;
    // Select items inside object of food_options
    let foodOpts = this.state.food_options;

    if ((weatherId >= 200 && weatherId < 600) || (weatherId >= 700 && weatherId < 800)) {
      // Weather condition for 'Rain' & 'Thunderstorm'
      // Select term at random from array of 'rain'
      let selectedTerm = foodOpts.rain[Math.floor(Math.random() * foodOpts.rain.length)];
      // While selectedTerm matches current term on state, continue to randomize (this pervents getting the same number consecutively).
      while (selectedTerm.term === this.state.term) {
        selectedTerm = foodOpts.rain[Math.floor(Math.random() * foodOpts.rain.length)];
      }
      // Re-set the state to match results
      this.setState({
        delivery: 1,
        term: `${selectedTerm.term}`,
        emoji_class_name: `${selectedTerm.class}`,
        heading: `Hey, looks like it might rain today. How \'bout ${selectedTerm.term.toLowerCase()} for delivery?`
      });
    } else if (weatherId >= 600 && weatherId < 700) {
      // Weather condition for 'Snow'
      let selectedTerm = foodOpts.snow[Math.floor(Math.random() * foodOpts.snow.length)];

      while (selectedTerm.term === this.state.term) {
        selectedTerm = foodOpts.snow[Math.floor(Math.random() * foodOpts.snow.length)];
      }

      this.setState({
        delivery: 1,
        term: `${selectedTerm.term}`,
        emoji_class_name: `${selectedTerm.class}`,
        heading: `Hey, looks like it might snow today. How \'bout ${selectedTerm.term.toLowerCase()} for delivery?`
      });
    } else if ((weatherId >= 800 && weatherId < 900) || (weatherId >= 950 && weatherId <= 955) && currentTemp > 40) {
      // Weather condition for 'Clear' and 'Clouds'
      let selectedTerm = foodOpts.clear[Math.floor(Math.random() * foodOpts.clear.length)];

      while (selectedTerm.term === this.state.term) {
        selectedTerm = foodOpts.clear[Math.floor(Math.random() * foodOpts.clear.length)];
      }

      this.setState({
        delivery: 0,
        term: `${selectedTerm.term}`,
        emoji_class_name: `${selectedTerm.class}`,
        heading:`Hey look, it's nice out! How \'bout ${selectedTerm.term.toLowerCase()}?`
      });
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({position: position.coords}, function() {
        axios.get(`https://andres-wdi-project4.herokuapp.com/api/weather/${this.state.position.latitude}/${this.state.position.longitude}`)
        .then((response) => {
          // Set the state of 'weather' to be the value of 'data'
          this.setState({
            weather: response.data,
            loadIcon: false,
            isLoaded: {
              display: 'block'
            }
          });
          // Source function with core functionality, see above.
          this.getNewOption();
        })
        .catch((err) => {
          console.log('ERROR: ', err);
        });
      });
    });
  }

  render() {
    return(
      <div className="hp-container">
        <LoadingAnim
          display={this.state.loadIcon}
        />
        <div className="hp-content" style={this.state.isLoaded}>
          <h1>{this.state.heading}</h1>
          <Link to={`/results/q?lat=${this.state.position.latitude}&lng=${this.state.position.longitude}&term=${this.state.term}&delivery=${this.state.delivery}`}>
            <button className="standard-btn">Search for {this.state.term}</button>
          </Link>
          <button className="standard-btn" onClick={this.getNewOption.bind(this)}>Give me another option</button>
        </div>
        <div className="spinning-emoji-container" style={this.state.isLoaded}>
          <div className={`emoji_box emoji_one ${this.state.emoji_class_name}`}></div>
          <div className={`emoji_box emoji_two ${this.state.emoji_class_name}`}></div>
          <div className={`emoji_box emoji_three ${this.state.emoji_class_name}`}></div>
          <div className={`emoji_box emoji_four ${this.state.emoji_class_name}`}></div>
          <div className={`emoji_box emoji_five ${this.state.emoji_class_name}`}></div>
          <div className={`emoji_box emoji_six ${this.state.emoji_class_name}`}></div>
          <div className={`emoji_box emoji_seven ${this.state.emoji_class_name}`}></div>
        </div>
      </div>
    );
  }
}

export default Homepage;
