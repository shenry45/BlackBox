export let eventDetails;

// put apikey in separate file and export variable as 'apikey'
import { apikey } from '/js/apikey.js';

export async function getTickets(type, input) {
    let events;
    //
    await fetch(APIfuncCheck(type, input))
        .then(response => response.json())
        .then(data => {

            console.log(data);
                // save event details
                events, eventDetails = data._embedded.events;

                return events;
            })
        .catch(error => console.log(error));
}

const APIfuncCheck = (type, input) => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = `http://app.ticketmaster.com/discovery/v2/events?apikey=${apikey}`;
    const params = `&startDateTime=${getDate()}&size=16&sort=date,asc&countryCode=US`;

    //check if search query or from genre search
    if (type === 'evnt') {
        return `${proxy}${url}&keyword=${input}${params}` 
    }  else {
        return `${url}${params}&genreId=${input}`;
    }
}

function getDate() {
    let nowDate = new Date();

    //get date in UTC format
    let selDate = `${nowDate.getFullYear()}-${checkNumb('month')}-${checkNumb('date')}T${checkNumb('hrs')}:${checkNumb('min')}:${checkNumb('sec')}Z`;

    // Check if value is lower than 10, returns formatted numbers
    function checkNumb(type) {
        const types = ['Month', 'Date', 'Hours', 'Minutes', 'Seconds'];
        //stores date and time values.
        const typesVal = [];

        //convert each Date value to 2 digits, ie 1 -> 01
        types.forEach(e => {
            //convert types var to JS date code
            let unit = eval(`nowDate.get${e}()`);

            if (unit < 10 && e === 'Month') {
                // add 1 to the month number because count starts at 1 instead of 0
                typesVal.push(`0${unit + 1}`)
            } else if (unit < 10) {
                // add 0 before number
                typesVal.push(`0${unit}`)
            } else {
                typesVal.push(unit)
            }
        });

        switch (type) {
            case 'month':
                console.log(typesVal[0]);
                return typesVal[0];
                break;
            case 'date':
                return typesVal[1];
                break;
            case 'hrs':
                return typesVal[2];
                break;
            case 'min':
                return typesVal[3];
                break;
            case 'sec':
                return typesVal[4];
                break;
            default:
                return '01';
                break;
        };
    }
   
    console.log(selDate)
    return selDate;
}