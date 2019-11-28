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
    let html, venueDet;

    const DOMel = {
      search: '.search',
      searchBtn: '.search-btn',
      genres: '.genres',
      results: '.events',
      sale: '.resAvail'
    };

    const months = [
      'January','February','March','April','May','June','July',
      'August','September','October','November','December'
    ];

    venueDet = el._embedded.venues[0];
    
    // check if in US or outside US and display location
    if (!venueDet.state) {
        return <div class="result">
            <div class="result-cont">
                <p class="eDate">{dateParse(el.dates.start.localDate)}</p>
                <div class="resStuff">
                <a href={el.url} target="_blank"><img src={checkImg()} alt={el.name} /></a>
                    <div class="resDetails">
                        <h3><a href={el.url} target="_blank"><u>{el.name}</u></a></h3>
                        <h5 class="resLoc">{filterLocation()}</h5>
                        <div class="resFoot">
                            <p class="ticket-price">{checkPrice()}</p>
                            {onSale(el)}
                        </div>
                    </div>
                </div>
            </div>
        </div>;
        // ${venueDet.city.name}, ${venueDet.country.name}
    } else {
        return <div class="result">
          <div class="result-cont">
            <p class="eDate">{dateParse(el.dates.start.localDate)}</p>
            <div class="resStuff">
              <a href={el.url} target="_blank">
                <img src={checkImg()} alt={el.name} />
              </a>
              <div class="resDetails">
                  <h3><a href={el.url} target="_blank"><u>{el.name}</u></a></h3>
                  <h5 class="resLoc">{venueDet.city.name}, {venueDet.state.stateCode}</h5>
                  <div class="resFoot">
                    <p class="ticket-price">{checkPrice()}</p>
                    {onSale(el)}
                  </div>
                </div>
              </div>
            </div>
          </div>;
        // html = <div class="result">
        //     <div class="result-cont">
        //         <p class="eDate">{dateParse(el.dates.start.localDate)}</p>
        //         <div class="resStuff">
        //         <a href={el.url} target="_blank"><img src={checkImg()} alt={el.name} /></a>
        //             <div class="resDetails">
        //                 <h3><a href={el.url} target="_blank"><u>{el.name}</u></a></h3>
        //                 <h5 class="resLoc">{venueDet.city.name}, {venueDet.state.stateCode}</h5>
        //                 <div class="resFoot">
        //                     <p class="ticket-price">{checkPrice()}</p>
        //                     <p class="resAvail">{checkSale()}</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>;
    }

    // insert new event
    // document.querySelector(DOMel.results).insertAdjacentHTML('beforeend', html);
    //console.log(checkSale(index));

    // randomize rotation of event in UI
    // document.querySelector(DOMel.results).lastElementChild.style.transform = `rotate(${randImgRotation()}deg)`;

    // remove 'on sale' tag in UI if no price shown
    if (!el.priceRanges || el.dates.status.code !== 'onsale') {
        // document.querySelector(`.id-${i}`).classList.add('inactive');
        
        return null;
    }
    function onSale(el) {
      if (!el.priceRanges || el.dates.status.code !== 'onsale') {
        return <p class="resAvail">{checkSale()}</p>
      } else {
        return null;
      }
    }


    function dateParse(date) {
      const fullDate = date.split('-');
      return `${months[parseInt(fullDate[1])]} ${fullDate[2]}`;
      //return date;
    }
    
    function randImgRotation() {
        const rotate = Math.ceil(Math.random() * 5);
        if (rotate % 2) {
            return rotate;
        } else {
            return '-' + rotate;
        }
    }
    
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
        const img = document.querySelector('header').backgroundImage;
        const imageInd = el.images[0].url;
    
        if (imageInd){
            return imageInd;
        } else {
            return img;
        }
    }
    
    function checkPrice() {
      console.log(el.priceRanges);

        const price = 'N/A';
    
        if (!el.priceRanges || el.priceRanges.length < 1){
            return price;
        } else {
            return <p><span class="start">Starts at </span>{getCurrSymbol()}{el.priceRanges[0].min}</p>;
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
            return 'ON SAL<u>E</u>';
        } else {
            return '';
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
            null
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