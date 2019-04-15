export let eventDetails;

// put apikey in separate file and export variable as 'apikey'
import { apikey } from '/js/apikey.js';

export async function getTickets(type, input) {
    let eventList;
    //
    await fetch(APIfuncCheck(type, input))
        .then(response => response.json())
        .then(data => {
                if (data.page.totalElements > 0) {
                    // save event details
                    eventList, eventDetails = data._embedded.events;
    
                    return eventList;
                }
            }
        )
        .catch(error => console.log(error))
}

const APIfuncCheck = (type, input) => {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = `http://app.ticketmaster.com/discovery/v2/events?apikey=${apikey}`;
    const params = `&startDateTime=${getDate()}&size=16&sort=date,asc&countryCode=US`;

    //check if search query or from genre search
    if (type === 'evnt') {
        return `${proxy}${url}&keyword=${input}${params}`;
    }  else {
        return `${proxy}${url}${params}&genreId=${input}`;
    }
}

const getDate = () => {
    let nowDate = new Date();

    //get date in UTC format
    let selDate = `${nowDate.getFullYear()}-${checkNumb('month')}-${checkNumb('date')}T${checkNumb('hrs')}:${checkNumb('min')}:${checkNumb('sec')}Z`;

    // Check if value is lower than 10, returns formatted numbers
    function checkNumb(type) {

        const dateTypes = ['Month', 'Date', 'Hours', 'Minutes', 'Seconds'];
        //stores current date and time values
        const dateTypesEval = [];

        //convert each Date value to 2 digits, ie 1 -> 01
        dateTypes.forEach(e => {
            //convert dateTypes var to JS date code
            let getDateVal = eval(`nowDate.get${e}()`);

            if (getDateVal < 10 && e === 'Month') {
                // add 1 to the month number because count starts at 1 instead of 0
                dateTypesEval.push(`0${getDateVal + 1}`);
            } else if (getDateVal < 10) {
                // add 0 before number
                dateTypesEval.push(`0${getDateVal}`);
            } else {
                dateTypesEval.push(getDateVal);
            }
        });

        switch (type) {
            case 'month':
                return dateTypesEval[0];
                break;
            case 'date':
                return dateTypesEval[1];
                break;
            case 'hrs':
                return dateTypesEval[2];
                break;
            case 'min':
                return dateTypesEval[3];
                break;
            case 'sec':
                return dateTypesEval[4];
                break;
            default:
                return '01';
                break;
        };
    }
   
    return selDate;
}