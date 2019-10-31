import React, { Component } from 'react';
import './Restaurant.scss';
import Pagination from 'react-js-pagination';

import RestaurantSearch from '../../Components/RestaurantSearch/RestaurantSearch';
import RestaurantItem from '../../Components/RestaurantItem/RestaurantItem';
import RestaurantMap from '../../Components/RestaurantMap/RestaurantMap';
import Spinner from '../../Components/Spinner/Spinner'

import emtyImg from '../../assets/images/empty.png';

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      filtredData: [],
      totalResults: 0,
      loading: false,
      error: {
        message: '',
        hasError: false
      },
      pagination: {
        page: 1,
        itemsCountPerPage: 9,
        pageRangeDisplayed: 5
      }
    };
  }

  handlePageChange = selectedPage => {
    const { pagination, data } = this.state;
    const indexMin = (selectedPage - 1) * pagination.itemsCountPerPage;
    const indexMax = indexMin + pagination.itemsCountPerPage;
    const filtredData = data.filter(
      (x, index) => index >= indexMin && index < indexMax
    );

    this.setState({
      filtredData: filtredData,
      pagination: { ...pagination, page: selectedPage }
    });

    window.scrollTo(0, 0);
  };

  fetchDataHandler = search => {
    this.setState({ loading: true });
    fetch('http://localhost:5000/api/v1/search', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: search
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        const filtredData = responseJson.data.slice(
          0,
          this.state.pagination.itemsCountPerPage
        );
        this.setState({
          data: responseJson.data,
          totalResults: responseJson.total,
          filtredData: filtredData,
          pagination: { ...this.state.pagination, page: 1 },
          loading: false,
          error: {
            message: '',
            hasError: false
          }
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: {
            message: 'something wrong',
            hasError: true
          }
        });
      });
  };

  contentRestaurantRender() {
    const { filtredData, loading, data } = this.state;

    if (loading) {
      return <Spinner/>;
    }
    if (data !== null && data.length <= 0) {
      return (
        <div className="empty">
          <img src={emtyImg} alt="empty resultat" />
        </div>
      );
    }
    if (filtredData.length > 0) {
      return (
        <>
          <div className="RestaurantList__content"></div>
          <div className="row">
            <div className="col-md-4">
              <RestaurantMap
                center={{
                  lat: parseFloat(filtredData[0].lattitude),
                  lng: parseFloat(filtredData[0].longitude)
                }}
                data={filtredData}
              />
            </div>
            <div className="col-md-8">
              <div className="row">
                {filtredData.map(item => {
                  return (
                    <div className="col-md-4" key={item.uid}>
                      <RestaurantItem data={item} />
                    </div>
                  );
                })}
              </div>
              <Pagination
                activePage={this.state.pagination.page}
                itemsCountPerPage={this.state.pagination.itemsCountPerPage}
                totalItemsCount={this.state.totalResults}
                pageRangeDisplayed={this.state.pagination.pageRangeDisplayed}
                innerClass="pagination"
                itemClass="page-item"
                linkClass="page-link"
                disabledClass="disabled"
                activeClass="active"
                onChange={this.handlePageChange}
              />
            </div>
          </div>
        </>
      );
    }
  }

  render() {
    const { filtredData } = this.state;

    return (
      <div className="RestaurantList">
        <div className="container">
          {this.state.error.hasError === true && (
            <div className="row">
              <div className="col-md-12">
                <div className="errorMessage">{this.state.error.message}</div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              <RestaurantSearch
                fetchDataHandler={this.fetchDataHandler}
                active={filtredData.length > 0 ? true : false}
              />
            </div>
          </div>
          {this.contentRestaurantRender()}
        </div>
      </div>
    );
  }
}

export default Restaurant;
