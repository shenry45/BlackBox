import {getTickets, eventDetails} from './api.js';

const DOMel = {
    search: '.search',
    searchBtn: '.search-btn',
    genres: '.genres',
    results: '.events',
    sale: '.resAvail'
};
const search = document.querySelector(DOMel.search);

const months = [
    'January','February','March','April','May','June','July',
    'August','September','October','November','December'
];

// gather event information from API
async function fetchTix(e, genre){
    await getTickets(e, searchOrGenre(e, genre));

    await showEvents();

    document.querySelector(DOMel.search).value = '';

    document.querySelector('#resultList').scrollIntoView(true);
};

const searchOrGenre = (e, genre) => {

    if (e === 'evnt') {
        return search.value.toLowerCase();
    } else {
        return genre;
        // return genre.toLowerCase();
    } 
}

// display event details
const showEvents = () => {
    let html, index, venueDet;

    document.querySelector(DOMel.results).innerHTML = '';

    // loops through event JSON
    for (let i = 0; i < eventDetails.length; i++) {
        index = eventDetails[i];

        venueDet = index._embedded.venues[0];
        
        // check if in US or outside US and display location
        if (!venueDet.state) {
            html = `<div class="result">
                <div class="result-cont">
                    <p class="eDate">${dateParse(index.dates.start.localDate)}</p>
                    <div class="resStuff">
                    <a href="${index.url}" target="_blank"><img src="${checkImg()}" alt="${index.name}"/></a>
                        <div class="resDetails">
                            <h3><a href="${index.url}" target="_blank"><u>${index.name}</u></a></h3>
                            <h5 class="resLoc">${filterLocation()}</h5>
                            <div class="resFoot">
                                <p class="ticket-price">${checkPrice()}</p>
                                <p class="resAvail id-${i}">${checkSale(index)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            // ${venueDet.city.name}, ${venueDet.country.name}
        } else {
            html = `<div class="result">
                <div class="result-cont">
                    <p class="eDate">${dateParse(index.dates.start.localDate)}</p>
                    <div class="resStuff">
                    <a href="${index.url}" target="_blank"><img src="${checkImg()}" alt="${index.name}"/></a>
                        <div class="resDetails">
                            <h3><a href="${index.url}" target="_blank"><u>${index.name}</u></a></h3>
                            <h5 class="resLoc">${venueDet.city.name}, ${venueDet.state.stateCode}</h5>
                            <div class="resFoot">
                                <p class="ticket-price">${checkPrice()}</p>
                                <p class="resAvail id-${i}">${checkSale(index)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        // insert new event
        document.querySelector(DOMel.results).insertAdjacentHTML('beforeend', html);

        // randomize rotation of event in UI
        document.querySelector(DOMel.results).lastElementChild.style.transform = `rotate(${randImgRotation()}deg)`;

        // remove 'on sale' tag in UI if no price shown
        if (!index.priceRanges || index.dates.status.code !== 'onsale') {
            document.querySelector(`.id-${i}`).classList.add('inactive');
        }
    };

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
        const imageInd = index.images[0].url;
;
        if (imageInd) {
            return imageInd
        } else {
            return img;
        }
    }

    function checkPrice() {
        const price = 'N/A';

        if (!index.priceRanges){
            return price;
        } else {
            return '<span class="start">Starts at</span><br>'+ getCurrSymbol() + index.priceRanges[0].min.toFixed(2);
        }
    }

    function getCurrSymbol() {
        const currency = index.priceRanges[0].currency;

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
        (index.dates.status.code === 'onsale') ? 'ON SAL<u>E</u>' : '';
    }
}

document.querySelector(DOMel.searchBtn).addEventListener('click', () => {
    // if search character count is 3+ on click
    if (search.value.length >= 3) {
        fetchTix('evnt');
    }
});
search.addEventListener('keydown', (e) => {
    // if search character count is 3+ on Enter key press
    if (e.key === 'Enter' && search.value.length >= 3) {
        fetchTix('evnt');
    }
});

document.querySelectorAll('.genList').forEach(el => {
    el.addEventListener('click', (ev) => {
        fetchTix('genre', ev.target.dataset.genre);
    });
});