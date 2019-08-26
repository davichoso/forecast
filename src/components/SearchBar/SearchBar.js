import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { classnames } from '../../helpers';
import './SearchBar.css'
import { connect } from 'react-redux';
var _ = require('lodash');
import { setForecastAction } from '../../redux/actions/daysForecast.actions'
import axios from 'axios';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
    };
  }

  handleChange = address => {
    this.setState({
      address,
      errorMessage: '',
      loading: false
    });
  };

  handleSelect = async (city) => {

    const { dispatch } = this.props;
    this.setState({ address: city, loading: true });
    const { data = {} } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt&appid=d6e937df2605f3c2ec3d742357f915aa`);
    const days = _.groupBy(data.list, i => i.dt_txt.substr(0, 10))
    dispatch(setForecastAction({ city, days }))
    this.setState({ loading: false });

  };

  handleCloseClick = () => {
    this.setState({
      address: '',
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const { address, errorMessage } = this.state;

    return (
      <div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {
            ({ getInputProps, suggestions, getSuggestionItemProps }) => {
              return (
                <div className="Demo__search-bar-container">
                  <div className="Demo__search-input-container">
                    <input
                      {...getInputProps({
                        placeholder: 'Please write down a city',
                        className: 'Demo__search-input',
                      })}
                    />
                    {this.state.address.length > 0 && (
                      <button
                        className="Demo__clear-button"
                        onClick={this.handleCloseClick}
                      >
                        x
                    </button>
                    )}
                  </div>
                  {suggestions.length > 0 && (
                    <div className="Demo__autocomplete-container">
                      {suggestions.map(suggestion => {
                        const className = classnames('Demo__suggestion-item', {
                          'Demo__suggestion-item--active': suggestion.active,
                        });
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, { className })}
                          >
                            <strong>
                              {suggestion.formattedSuggestion.mainText}
                            </strong>{' '}
                            <small>
                              {suggestion.formattedSuggestion.secondaryText}
                            </small>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}
        {
          this.state.loading &&
          <div style={{textAlign:"center"}}>loading ..... </div>
        }
      </div>

    );
  }
}

export default connect()(SearchBar);
