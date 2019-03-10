export let eventDetails;

// put apikey in separate file and export variable as 'apikey'
import apikey from apikey.js;

export async function getTickets(type, key) {
    let events;

    await fetch(APIfuncCheck(type, key))
        .then(response => response.json())
        .then(data => {
                events, eventDetails = data._embedded.events;

                console.log(data._embedded.events);
                return events;
            })
        .catch(error => console.log(error));
}

function APIfuncCheck(type, key) {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}`;
    const params = `&sort=date,asc&countryCode=US&startDateTime=${getDate()}`;

    //check if search query or from genre search
    if (type === 'evnt'){
        return `${url}&keyword=${key}${params}`;
    } else {
        return `${url}&classificationName=${key}${params}`;
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
        types.forEach(function(e) {
            //convert types var to JS date code
            const unit = eval(`nowDate.get${e}()`);

            //check if date code is 2 digits
            (unit <= 9) ? typesVal.push(`0${unit}`) : typesVal.push(unit);
        });

        switch (type) {
            case 'month':
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
   
    return selDate;
}