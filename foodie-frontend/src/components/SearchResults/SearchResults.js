import React, { Component } from 'react';
import Result from './Result.js';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    }
  }

  componentDidMount() {
    fetch(`http://localhost:8000/api/yelp/${this.props.params.lat}/${this.props.params.lng}?term=${this.props.location.query.term}&delivery=${this.props.location.query.delivery}`, {
      method: 'GET'
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({results: data});
      })
    })
    .catch((err) => {
      res
      .status(400)
      .json(err)
    });
  }

  render() {
    return(
      <div className="container">
        <h1>Here's a list of places for "{this.props.location.query.term.toLowerCase()}"</h1>
        {this.state.results.map((result) => {
          return(
            <div key={result.id}>
              <Result
                name={result.name}
                categories={result.categories.map((category) => {
                  return category.title + ' '
                })}
                address={`${result.location.display_address[0]} ${result.location.display_address[1]}`}
                price={result.price}
                rating={result.rating}
                delivery={result.transactions.indexOf('delivery', 0) != -1 ? 'Yes' : 'No'}
              />
            </div>
          )
        })}
      </div>
    );
  }
}

export default SearchResults;
