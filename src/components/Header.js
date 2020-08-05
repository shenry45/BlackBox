import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './Searchbar';
import NavLinks from './Navigation/NavLinks';
import LogoBlack from '../img/logo-black-box-white.svg';

const Header = () => {
  return (
    <header>
      <div className="top-nav">
        <Link to="/">
          <img src={LogoBlack} className="logo" alt="Black Box logo" />
        </Link>
        <SearchBar />
        <nav>
          <NavLinks />
        </nav>
      </div>
    </header>
  )
}

export default Header;