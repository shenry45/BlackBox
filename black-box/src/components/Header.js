import React from 'react';

import NavLinks from './Navigation/NavLinks';

const Header = () => {
  return (
    <header>
      <div className="top-nav">
        <h1>BLACK BOX</h1>
        <nav>
          <NavLinks />
        </nav>
      </div>
    </header>
    // <header>
    //   <div class="formatter">
    //     <div>
    //       <div class="search-cont">
    //         <div class="search-bar">
    //           <a href="#results"><i class="fas fa-search search-btn"></i></a><input class="search" placeholder="Search an artist or event..." maxlength="30">
    //         </div>
    //       </div>
    //     </div>
    // </header>
  )
}

export default Header;