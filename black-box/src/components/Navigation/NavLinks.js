import React from 'react';
import { withRouter } from 'react-router';

class NavLinks extends React.Component {

  handlerClick = e => {
    e.preventDefault();

    if (e.target.getAttribute('href') === '/') {
      this.props.history.push('/');
    } else {
      this.props.history.push(`${e.target.getAttribute('href')}`);
    }
  }

  render() {
    return (
      <nav>
        <p><a href="/" onClick={this.handlerClick}>Home</a></p>
        <p><a href="/about" onClick={this.handlerClick}>About</a></p>
        {/* <p><a href="/contact" onClick={this.handlerClick}>Contact</a></p> */}
        {/* <p><a href="/events" onClick={this.handlerClick}>Events</a></p> */}
        {/* <p><a href="/login" onClick={this.handlerClick}>Login</a></p> */}
      </nav>
    )
  }
}

export default withRouter(NavLinks);