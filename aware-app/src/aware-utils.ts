import { sprintf } from 'sprintf-js'

let months: string[] = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
];

type TimestampDate = { day: number, month: string, year: number };
type TimestampTime = { hour: number, minutes: string };

// Generate formatted time stamp
export default function produceTimestamp(): string {
    let date: Date = new Date();
    let currentTime: TimestampTime = getTime(date);
    let currentDay: TimestampDate = getDate(date);
    let ampm: string = currentTime.hour >= 12 ? 'pm' : 'am';

    return sprintf('%s %d, %d - %d:%s %s',
        currentDay.month, currentDay.day, currentDay.year,
        currentTime.hour, currentTime.minutes, ampm);
}

function getTime(date: Date): TimestampTime {
    return {
        hour: date.getHours(),
        minutes: (date.getMinutes() <= 9) ? "0" + date.getMinutes() : "" + date.getMinutes()
    };
}

function getDate(date: Date): TimestampDate {
    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear()
    };
}