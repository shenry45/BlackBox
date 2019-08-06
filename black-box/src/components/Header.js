import React from 'react';

import NavLinks from './Navigation/NavLinks';

const Header = () => {
  return (
    <header>
      <div className="brand">
        <p>Random Text</p>
      </div>
      <div className="nav">
        <nav>
          <NavLinks />
        </nav>
      </div>
    </header>
  )
}

export default Header;