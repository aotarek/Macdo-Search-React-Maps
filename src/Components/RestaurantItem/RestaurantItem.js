import React from 'react';
import './RestaurantItem.scss';
import PropTypes from 'prop-types';

import placeholderImg from '../../assets/images/placeholder.png';
import {
  FaCity,
  FaGlobeAmericas,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

const restaurantItem = props => {
  const { name, phone, country, city, address } = props.data;
  return (
    <div className="restaurantItem">
      <div className="restaurantItem__img">
        <img src={placeholderImg} alt="placeholder restaurant" />
      </div>
      <p className="restaurantItem__name">{name}</p>
      <div className="restaurantItem__info">
        <p>
          <FaGlobeAmericas /> : {country}
        </p>
        <p>
          <FaCity /> : {city}
        </p>
        <p>
          <FaPhone /> : {phone}
        </p>
        <p>
          <FaMapMarkerAlt /> : {address}
        </p>
      </div>
    </div>
  );
};

restaurantItem.propTypes = {
  data: PropTypes.object
};

export default restaurantItem;
