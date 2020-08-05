import React from 'react';
import { connect } from 'react-redux';

class Results extends React.Component {
  state = {
    results: []
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.results !== prevProps.results) {
      this.setState({results: this.props.results});
    }
  }

  resultFormat(el) {
    const months = [
      'January','February','March','April','May','June','July',
      'August','September','October','November','December'
    ];
    const venueDet = el._embedded.venues[0];
    const eImage = {
      backgroundImage: "url('" + checkImg() + "')"
    }

    console.log(eImage);

    // check if in US or outside US and display location
    if (!venueDet.state) {
        return <div class="result" key={el.id}>
            <div class="result-cont">
                <p class="eDate">{dateParse(el.dates.start.localDate)}</p>
                <div class="resStuff">
                <a href={el.url} target="_blank" rel="noopener noreferrer" className="event-img" style={eImage}>
                  {/* <img src={checkImg()} alt={el.name} /> */}
                  </a>
                    <div class="resDetails">
                        <h3><a href={el.url} target="_blank" rel="noopener noreferrer"><u>{checkTitle()}</u></a></h3>
                        <h5 class="resLoc">{filterLocation()}</h5>
                        <div class="resFoot">
                            <p class="ticket-price">{checkPrice()}</p>
                            {onSale(el)}
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    } else {
        return <div className="result" key={el.id}>
          <div className="result-cont">
            <p className="eDate">{dateParse(el.dates.start.localDate)}</p>
            <div className="resStuff">
            <a href={el.url} target="_blank" rel="noopener noreferrer" className="event-img" style={eImage}>
                  {/* <img src={checkImg()} alt={el.name} /> */}
                  </a>
              <div className="resDetails">
                  <h3><a href={el.url} target="_blank" rel="noopener noreferrer"><u>{checkTitle()}</u></a></h3>
                  <h5 className="resLoc">{venueDet.city.name}, {venueDet.state.stateCode}</h5>
                  <div className="resFoot">
                    <p className="ticket-price">{checkPrice()}</p>
                    {onSale(el)}
                  </div>
                </div>
              </div>
            </div>
          </div>;
    }

    // randomize rotation of event in UI
    // document.querySelector(DOMel.results).lastElementChild.style.transform = `rotate(${randImgRotation()}deg)`;

    // remove 'on sale' tag in UI if no price shown
    // if (!el.priceRanges || el.dates.status.code !== 'onsale') {
    //     // document.querySelector(`.id-${i}`).classList.add('inactive');
        
    //     return null;
    // }

    function onSale(el) {
      if (el.dates.status.code === 'onsale') {
        return <p className="resAvail">{checkSale()}</p>
      } else {
        return null;
      }
    }


    function dateParse(date) {
      const fullDate = date.split('-');

      return `${months[parseInt(fullDate[1])-1]} ${fullDate[2]}`;
    }
    
    // function randImgRotation() {
    //     const rotate = Math.ceil(Math.random() * 5);
    //     if (rotate % 2) {
    //         return rotate;
    //     } else {
    //         return '-' + rotate;
    //     }
    // }
    
    function filterLocation() {
        if (!venueDet.state && venueDet.country.name) {
            return `${venueDet.city.name}, ${venueDet.country.name}`;
        } else if (!venueDet.state && !venueDet.country.name) {
            return `${venueDet.city.name}`;
        } else {
            return `${venueDet.city.name}, ${venueDet.state.stateCode}`;
        }
    }
    
    function checkImg() {
        // const img = document.querySelector('header').backgroundImage;
        const imageInd = el.images[0].url;
    
        if (imageInd){
            return imageInd;
        } else {
            return './img/concert.jpg';
        }
    }
    
    function checkPrice() {
        const price = 'N/A';
    
        if (!el.priceRanges || !el.priceRanges[0].min ){
            return price;
        } else {
            return <><span className="start">Starts at </span>{getCurrSymbol()}{el.priceRanges[0].min.toFixed(2)}</>;
        }
    }
    
    function getCurrSymbol() {
        const currency = el.priceRanges[0].currency;
    
        if (currency === 'USD') {
            return '$';
        } else if (currency === 'GBP') {
            return '£';
        } else if (currency === 'EUR') {
            return '€';
        } else if (currency === 'MXN') {
            return 'Mex$';
        } else if (currency === 'AUD') {
            return 'AUD';
        } else if (currency === 'CAD') {
            return 'CA $';
        } else {
            return '';
        }
    }
    
    function checkSale() {
        if (el.dates.status.code === 'onsale') {
            return 'ON SALE';
        } else {
            return '';
        }
    }

    function checkTitle() {
      if (el.name.length > 71) {
        return el.name.slice(0,71) + '...';
      } else {
        return el.name;
      }
    }
  }
  
  render() {
    return (
      <div className="results">
        {
          (this.state.results.length > 0) ?
            this.state.results.map(el => {
              return this.resultFormat(el);
            }) :
            <p>No results found :(</p>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    results: state.apiRed.friends
  }
};

export default connect(mapStateToProps)(Results);