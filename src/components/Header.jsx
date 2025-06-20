import React from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';

const Header = ({ title }) => (
  <h1 className="header">{title}</h1>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
