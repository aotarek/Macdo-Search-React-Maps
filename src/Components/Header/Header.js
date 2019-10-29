import React from 'react';
import './Header.scss';
import logo from '../../assets/images/logo.png';

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header__content">
          <img className="header__content--logo" src={logo} alt="logo" />
          <h1 className="header__content--title">macdonald search</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
