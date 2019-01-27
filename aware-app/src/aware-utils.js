const sprintf = require('sprintf-js').sprintf;

// Generate formatted time stamp
export function produceTimestamp() {
    var date = new Date();
    var currentTime = getTime(date);
    var currentDay = getDate(date);
    var ampm = currentTime.hour >= 12 ? 'pm' : 'am';

    return sprintf('%s %d, %d - %d:%s %s', currentDay.month, currentDay.day, currentDay.year, currentTime.hour, currentTime.minutes, ampm);
}

function getTime(date) {
    const time = { hour: date.getHours(), minutes: (date.getMinutes() <= 9) ? "0" + date.getMinutes() : date.getMinutes() };
    return time;
}

function getDate(dateObj) {
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const date = { day: dateObj.getDate(), month: months[dateObj.getMonth()], year: dateObj.getFullYear() };
    return date;
}