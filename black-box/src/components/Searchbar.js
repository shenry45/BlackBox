import React from 'react';
import { connect } from 'react-redux';

import { getConcerts } from '../redux/actions/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchBar extends React.Component {
  state = {
    search: ''
  }
  
  handlerChangeInput = e => {
    this.setState({
      search: e.target.value
    });
  }
  
  handlerSearch = e => {
    e.preventDefault();

    if (this.state.search === '' || !this.state.search.search('<')) {
      this.setState({
        search: ''
      })
    } else {
      this.props.getConcerts('evnt', this.state.search);
    }
  }

  render() {
    return (
      <div className="formatter">
        <div>
          <div className="search-cont">
            <div className="search-bar">
              <span className="search-btn">
                <FontAwesomeIcon icon={faSearch} size="4x" className="search-btn" onClick={this.handlerSearch}/>
              </span>
              <form onSubmit={this.handlerSearch}>
                <input className="search" placeholder="Search an artist or event..." maxLength="50" onChange={this.handlerChangeInput} value={this.state.search} onSubmit={this.handlerSearch}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pending: false
  }
}

export default connect(mapStateToProps, { getConcerts })(SearchBar);