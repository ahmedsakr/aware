import {sprintf} from 'sprintf-js'

let months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
];

// Generate formatted time stamp
export default function produceTimestamp(): string {
    let date = new Date();
    let currentTime = getTime(date);
    let currentDay = getDate(date);
    let ampm = currentTime.hour >= 12 ? 'pm' : 'am';

    return sprintf( '%s %d, %d - %d:%s %s',
                    currentDay.month, currentDay.day, currentDay.year,
                    currentTime.hour, currentTime.minutes, ampm);
}

function getTime(date: Date): { hour: number, minutes: string } {
    return {
        hour: date.getHours(),
        minutes: (date.getMinutes() <= 9) ? "0" + date.getMinutes() : "" + date.getMinutes()

    };
}

function getDate(date: Date): { day: number, month: string, year: number} {
    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear()
    };
}