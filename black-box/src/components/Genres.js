import React from 'react';
import { connect } from 'react-redux';

import { getConcerts } from '../redux/actions/Search';


class Genres extends React.Component {
  
  genreList = [
    { name: "ROCK", id: "KnvZfZ7vAeA" },
    { name: "ELECTRONIC", id: "KnvZfZ7vAvF" },
    { name: "COUNTRY", id: "KnvZfZ7vAv6" },
    { name: "HIP-HOP / RAP", id: "KnvZfZ7vAv1" },
    { name: "METAL", id: "KnvZfZ7vAvt" },
    { name: "REGGAE", id: "KnvZfZ7vAed" },
    { name: "JAZZ", id: "KnvZfZ7vAvE" }
  ];

  fetchResults = (e) => {
    e.preventDefault();

    this.props.getConcerts('genre', e.target.className);
  }

  render() {

    return (
      <section className="genres">
          <div className="formatter">
              <h2>Genres</h2>
              <hr />
              <p className="subhead">Pick from a genre of music to see what the latest events are.</p>
              <div className="genList">
                  {
                    this.genreList.map(gen => {
                      console.log(this);
                      return <p
                        key={gen.id}
                        className={gen.id}
                        onClick={this.fetchResults}>{gen.name}</p>
                    })
                  }
              </div>
          </div>
      </section>
    )
  }
}

export default connect(null, { getConcerts })(Genres);