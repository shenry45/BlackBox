import React from 'react';

import SearchBar from './Searchbar';
import NavLinks from './Navigation/NavLinks';
import LogoBlack from '../img/logo-black-box-white.svg';

const Header = () => {
  return (
    <header>
      <div className="top-nav">
        {/* <h1>BLACK BOX</h1> */}
        <img src={LogoBlack} className="logo" alt="Black Box logo" />
        <SearchBar />
        <nav>
          <NavLinks />
        </nav>
      </div>
    </header>
  )
}

export default Header;