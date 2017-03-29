import React, { Component } from 'react';
import { Link } from 'react-router';
import update from 'react-addons-update';

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
      delivery: undefined,
      messages: {
        rain: [
          'Hey looks like it\'s raining outside :(. How bout delivery?'
        ]
      },
      heading: ""
    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({position: position.coords});

      fetch(`http://localhost:3000/api/weather/${this.state.position.latitude}/${this.state.position.longitude}`, {
        method: 'GET'
      })
      .then((results) => {
        results.json().then((data) => {
          this.setState({weather: data});

          if (data.weather[0].id >= 500 && data.weather[0].id < 600) {
            this.setState({delivery: true})
          } else {
            this.setState({delivery: false})
          }
        });
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      })
    })
  }

  render() {
    return(
      <div>
        <h1>Homepage</h1>
        <div className="form-container">
          <form>
            <input name="term" type="text" onChange={(e) => {
              this.setState({term: e.target.value});
            }} />
          </form>
          <Link to={`/results/${this.state.position.latitude}/${this.state.position.longitude}?term=${this.state.term}&delivery=${this.state.delivery}`}>
            <button type="button">Search</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Homepage;
