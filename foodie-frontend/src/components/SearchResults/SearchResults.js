import React, { Component } from 'react';
import Result from './Result';
import { Link } from 'react-router';
import axios from 'axios';

import LoadingAnim from '../LoadingAnim';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      page_title: '',
      loadIcon: true,
    }
  }

  componentDidMount() {
    axios.get(`https://andres-wdi-project4.herokuapp.com/api/yelp/q?lat=${this.props.location.query.lat}&lng=${this.props.location.query.lng}&term=${this.props.location.query.term}&delivery=${this.props.location.query.delivery}`)
    .then((response) => {
      if(!response.data.length || response.data.length === 0){
        // ERROR HANDLING: If data is undefined or data is an empty array, display error page_title.
        this.setState({
          page_title: `Looks like there is no "${this.props.location.query.term.toLowerCase()}" near you at this moment.`,
          loadIcon: false
        });
      } else {
        // If data is an array with a length greater than 0, set state to match result.
        this.setState({
          results: response.data,
          page_title: `Here's a list of places for "${this.props.location.query.term.toLowerCase()}" ${parseInt(this.props.location.query.delivery) ? 'with delivery available' : ''}`,
          loadIcon: false
        });
      }
    })
    .catch((err) => {
      console.log('ERROR: ', err)
    });
  }

  render() {
    return(
      <div className="container">
        <LoadingAnim
          display={this.state.loadIcon}
        />
        <h1>{this.state.page_title}</h1>
        <div className="results-container">
          {this.state.results.map((result) => {
            return(
              <Result
                key={result.id}
                name={result.name}
                categories={result.categories.map((category, index) => {
                  if (index === (result.categories.length - 1)) {
                    return category.title
                  } else {
                    return category.title + ', '
                  }
                })}
                address={`${result.location.display_address[0]} ${result.location.display_address[1]}`}
                price={result.price}
                rating={result.rating}
                delivery={result.transactions.indexOf('delivery', 0) != -1 ? 'Yes' : 'No'}
                url={result.url}
              />
            )
          })}
        </div>
        {!this.state.loadIcon ? <h4>Can't find what you're looking for? <Link to="/">Search for something else</Link></h4> : ''}
      </div>
    );
  }
}

export default SearchResults;
