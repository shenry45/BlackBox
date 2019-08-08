import React from 'react';

import Genres from '../components/Genres';

const EventsPage = () => {



  return (
    <>
      <Genres />
      <section className="results">
        <div className="formatter">
          <div id="theBoard">
            <h2>The Board</h2>
            <p className="subhead">See what's happening in the world.</p>
          </div>
          <div className="events">
              
          </div>
        </div>
      </section>
    </>
  )
}

export default EventsPage;

/*
<!-- <div>Some Random Text</div>
              <div class="result">
                  <img src="./img/search-background.jpg" alt="Event picture"/>
                  <div class="resDetails">
                      <h3>Event Name</h3>
                      <h5 class="resLoc">Location, AZ</h5>
                      <div class="resFoot">
                          <p class="ticket-price">$45.00</p>
                          <p class="resAvail">ON SAL<u>E</u></p>
                      </div>
                  </div>
              </div> -->
*/