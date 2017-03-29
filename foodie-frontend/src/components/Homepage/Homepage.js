import React, { Component } from 'react';
import update from 'react-addons-update';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {},
      term: ''
    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({position: position.coords});
    })
  }

  render() {
    console.log(this.state.position);
    return(
      <div>
        <h1> Hello World! </h1>
        <div className="form-container">
          <form>
            <input name="term" type="text" onChange={(e) => {
              this.setState({term: e.target.value});
            }} />
          </form>
        </div>
      </div>
    );
  }
}

export default Homepage;
