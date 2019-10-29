import React, { Component } from 'react';
import './RestaurantSearch.scss';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

class RestaurantSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      formHasError: false,
      formErrorMessage: ''
    };
  }

  handleChangeSerch = value => {
    // TODO : dont send search if we remove character
    this.setState({ search: value });
    this.handleSearch();
  };

  handleSearch = debounce(() => {
    if (this.state.search.length <= 0 || this.state.search.length > 2) {
      this.setState({ formErrorMessage: 'max length 2', formHasError: true });
    } else {
      this.props.fetchDataHandler(this.state.search);
      this.setState({
        formErrorMessage: '',
        formHasError: false
      });
    }
  }, 500);

  render() {
    const { formHasError, formErrorMessage, search } = this.state;
    const { active } = this.props;
    return (
      <div className={active ? 'searchActive search' : 'search'}>
        <h2 className="search__title">
          Explore Macdonald Restaurants with Search Like Never Before
        </h2>
        <p className="search__paragraph">
          Voluptate incididunt dolore proident et do consectetur exercitation
          nostrud magna cillum aliqua laborum quis proident. Minim eu proident
          ipsum dolore eiusmod voluptate est.
        </p>
        <input
          className="search__input"
          placeholder="Search with Code Country ex : AL,AK,AR... "
          type="text"
          name="serch"
          value={search}
          onChange={e => this.handleChangeSerch(e.target.value)}
        />
        {formHasError === true && (
          <p className="search__error">{formErrorMessage}</p>
        )}
      </div>
    );
  }
}

RestaurantSearch.propTypes = {
  active: PropTypes.bool,
  fetchDataHandler: PropTypes.func
};

export default RestaurantSearch;
