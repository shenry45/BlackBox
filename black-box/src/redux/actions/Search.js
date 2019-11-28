import axios from 'axios';

export const SEARCH_PENDING = 'SEARCH_PENDING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

export const getConcerts = (searchType, input) => dispatch => {
    dispatch({ type: SEARCH_PENDING, payload: true });

    axios
    .get(APIfuncCheck(searchType, input))
    .then(res => {
        dispatch({ type: SEARCH_PENDING, payload: false });
        dispatch({ type: SEARCH_SUCCESS, payload: res.data._embedded.events });
    })
    .catch(err => {
        dispatch({ type: SEARCH_PENDING, payload: false });
        dispatch({ type: SEARCH_FAILURE, payload: err.message });
    });

    dispatch({ type: SEARCH_PENDING, payload: false });
};

const APIfuncCheck = (type, input) => {
    // const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = `http://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_APIKey}`;
    const params = `&startDateTime=${getDate()}&size=16&sort=date,asc&countryCode=US`;

    //check if search query or from genre search
    if (type === 'evnt') {
        // return `${proxy}${url}&keyword=${input}${params}`;
        return `${url}&keyword=${input}${params}`;
    }  else {
        // return `${proxy}${url}${params}&genreId=${input}`;
        return `${url}${params}&genreId=${input}`;
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
          let getDateVal = nowDate[`get${e}`]();

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
          case 'date':
              return dateTypesEval[1];
          case 'hrs':
              return dateTypesEval[2];
          case 'min':
              return dateTypesEval[3];
          case 'sec':
              return dateTypesEval[4];
          default:
              return '01';
      };
  }
 
  return selDate;
}