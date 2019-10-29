import React, { Component } from 'react';
import './RestaurantMap.scss';
import PropTypes from 'prop-types';

import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MarkerComponent = props => {
  return (
    <div className="Marker">
      <button type="button">
        <FaMapMarkerAlt />
      </button>
    </div>
  );
};

class RestaurantMap extends Component {
  static defaultProps = {
    zoom: 9
  };

  render() {
    const { center, zoom, data } = this.props;
    return (
      <div className="restaurantMap">
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            {data.map(item => {
              return (
                <MarkerComponent
                  lat={item.lattitude}
                  lng={item.longitude}
                  key={item.uid}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

RestaurantMap.propTypes = {
  zoom: PropTypes.number,
  center: PropTypes.object,
  data: PropTypes.array
};

export default RestaurantMap;
