import {
    addDays,
    isValid,
    formatDistanceToNow,
    differenceInDays,
    fromUnixTime,
    getUnixTime,
    parse,
    addMinutes,
    formatDistanceToNowStrict,
} from 'date-fns'
import format from 'date-fns/format'

export const DateFormat = {
    date: 'MM/dd/yyyy',
    dateTime: "MMM dd, yyyy hh:mm a",
    monthDate: "MMM yyyy",
    dateTimeWithAt: "MMM dd, yyyy 'at' hh:mm a",
    time: "hh:mm a",
}

export class DateUtility {
    static dateToString(date,formatStr = DateFormat.date) {
        if (!date) return ''
        if (isValid(date)) {
            return format(date,formatStr,{})
        }
        return ''
    }

    static formatToUnixString(date,formatStr = DateFormat.date) {
        if (!date) return ''
        if (isValid(date)) {
            return format(addMinutes(date,date.getTimezoneOffset()),formatStr);
        }
        return ''
    }

    static dateJSONToString(date) {
        if (!date) return ''
        return parse(date,DateFormat.dateTime,new Date())
    }

    static msToDate(ms) {
        return fromUnixTime(ms)
    }

    static addDay(date,day) {
        return addDays(date,day)
    }

    static diff(date1,date2) {
        return differenceInDays(date2,date1)
    }

    static getDistanceInWord(date) {
        return formatDistanceToNow(new Date(date))
    }

    static getDistanceInWordForUnit(date,unit = "day") {
        const temp = formatDistanceToNowStrict(new Date(date),{ unit,addSuffix: true })
        if (temp.includes("0 day")) {
            return "Today"
        }
        if (temp.includes("1 day")) {
            return "Yesterday"
        }
        return temp
    }

    static getUnixTimeStamp() {
        return getUnixTime(new Date())
    }

    static convertDateToUnix(date) {
        return getUnixTime(new Date(date))
    }

    static convertDaysToSeconds = (days = 1) => {
        const secondsInDay = 86400;
        return days * secondsInDay
    }
}
