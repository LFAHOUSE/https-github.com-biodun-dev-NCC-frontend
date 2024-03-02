export const formatEvents = (events) => {
    let formattedEvents ={};
  
    for (let event of events) {
      // start and end dates of the event 
      let startDate = new Date(event.startDate);
      let endDate = new Date(event.endDate);
  
      // start months and end months of the event
      let startMonth = startDate.getMonth();
      let endMonth = endDate.getMonth();
  
      // Now lets loop the months from start to end
      for (let month = startMonth; month <= endMonth; month++) {
        // Get the month name as a string from an array of month names
        let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month];
  
        if (formattedEvents.hasOwnProperty(monthName)) {
          formattedEvents[monthName].push(event);
        } else {
          formattedEvents[monthName] = [event];
        }
      }
  
      // Compare the start and end dates of the event and format them as tiwan tiwa style e.g "2nd - 5th"
      if (startDate.getDate() !== endDate.getDate()) {
        // Get the ordinal suffixes of the start and end dates as strings
        let startSuffix = getOrdinalSuffix(startDate.getDate());
        let endSuffix = getOrdinalSuffix(endDate.getDate());
  
        let dateRange = startDate.getDate() + startSuffix + " - " + " " +  endDate.getDate() + endSuffix;
  
        // Replace the original startDate and endDate properties of the event with the dateRange
        event.startDate = dateRange;
        event.endDate = dateRange;
      }
    }
  
    // Return the formatted events object
    return formattedEvents;
  }
  
  // A helper function that takes a number and returns its ordinal suffix as a string
  function getOrdinalSuffix(number) {
    // Check the last digit of the number
    let lastDigit = number % 10;
  
    // Check the last two digits of the number
    let lastTwoDigits = number % 100;
  
    // Declare a variable to store the suffix
    let suffix;
  
    // Assign the suffix based on the last digit and the last two digits
    if (lastDigit === 1 && lastTwoDigits !== 11) {
      suffix = "st";
    } else if (lastDigit === 2 && lastTwoDigits !== 12) {
      suffix = "nd";
    } else if (lastDigit === 3 && lastTwoDigits !== 13) {
      suffix = "rd";
    } else {
      suffix = "th";
    }
  
    // Return the suffix
    return suffix;
  }
  
  

export const groupEventsByMonth = (eventsByMonth) => {
  
  let groupedEvents = [];
  let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  for (let monthName of monthNames) {
    if (eventsByMonth.hasOwnProperty(monthName)) {
      let monthEvents = {};

      monthEvents.month = monthName;
      monthEvents.events = eventsByMonth[monthName];
      groupedEvents.push(monthEvents);
    }
  }
  return groupedEvents;
}

