export const formatEvents = (events) => {
    let formattedEvents ={};
  
    for (let event of events) {
      let startDate = new Date(event.startDate);
      let endDate = new Date(event.endDate);
  
      let startMonth = startDate.getMonth();
      let endMonth = endDate.getMonth();

      for (let month = startMonth; month <= endMonth; month++) {
        let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month];
  
        if (formattedEvents.hasOwnProperty(monthName)) {
          formattedEvents[monthName].push(event);
        } else {
          formattedEvents[monthName] = [event];
        }
      }
  
      if (startDate.getDate() !== endDate.getDate()) {

        let startSuffix = getOrdinalSuffix(startDate.getDate());
        let endSuffix = getOrdinalSuffix(endDate.getDate());
  
        let dateRange = startDate.getDate() + startSuffix + " - " + " " +  endDate.getDate() + endSuffix;
  
        event.startDate = dateRange;
        event.endDate = dateRange;
      }
    }
  
    return formattedEvents;
  }
  
  function getOrdinalSuffix(number) {
    let lastDigit = number % 10;
    let lastTwoDigits = number % 100;

    let suffix;
 
    if (lastDigit === 1 && lastTwoDigits !== 11) {
      suffix = "st";
    } else if (lastDigit === 2 && lastTwoDigits !== 12) {
      suffix = "nd";
    } else if (lastDigit === 3 && lastTwoDigits !== 13) {
      suffix = "rd";
    } else {
      suffix = "th";
    }
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

