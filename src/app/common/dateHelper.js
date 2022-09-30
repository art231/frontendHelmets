import moment from 'moment-timezone';

export const MILLISEC_IN_MIN = 60000;
export const MILLISEC_IN_HOUR = 3600000;
export const MILLISEC_IN_DAY = 86400000;
export const MILLISEC_IN_TWO_DAYS = 172800000

export function dateInUTC(period) {
    let date = moment(period).utc().format();
    return date
}

export function dateOneDayAgo() {
    let date = moment().add(-1, 'days').utc().format()
    return date
}

export function dateOneHourAgo() {
    let date = moment().add(-4, 'hour').utc().format()
    return date
}

export function date30MinutesAgo(time) {
    let date = moment(time).add(-30, 'minutes').format()
    return date
}

export function date30MinutesAfter(time) {
    let date = moment(time).add(30, 'minutes').format()
    return date
}

export function dateToTime(from, to) {
    let date = moment(to).tz("Europe/Moscow").format('x') - moment(from).tz("Europe/Moscow").format('x')

    let seconds = (moment.duration(date).seconds()) ? moment.duration(date).seconds() + ' секунд ' : '';
    let minutes = (moment.duration(date).minutes()) ? moment.duration(date).minutes() + ' минут ' : '';
    let hours = (moment.duration(date).hours()) ? moment.duration(date).hours() + ' часов ' : '';
    let days = (moment.duration(date).days()) ? moment.duration(date).days() + ' дней ' : '';
    let weeks = (moment.duration(date).weeks()) ? moment.duration(date).weeks() + ' недель ' : '';
    let months = (moment.duration(date).months()) ? moment.duration(date).months() + ' месяц ' : '';
    let years = (moment.duration(date).years()) ? moment.duration(date).years() + ' год ' : '';

    let time = years + months + days + hours + minutes + seconds;

    return time;

}

export function dateInMoscow(period, format) {
    if (format === 'display') {
        format = 'YYYY.MM.DD HH:mm:ss'
    } else {
        format = null
    }

    let date = moment(period).tz("Europe/Moscow").format(format)
    return date;
}

export function dateWithTZ(period, tz) {
    if (tz) {
        return moment(period).utcOffset(tz.offsetMinutes).format('YYYY.MM.DD HH:mm:ss Z');
    } else {
        return moment(period).utcOffset(0).format('YYYY.MM.DD HH:mm:ss') + '+?';
    }
}

export function timeConverter(period) {
    let min, hour, sec, time, day;

    if (period > 86400) {
        day = Math.trunc(period / 86400) + 'д. ';
        hour = Math.trunc((Number(period) - Number(Math.trunc(period / 86400) * 86400)) / 3600) + 'ч. ';
        sec = (period % 60) + 'сек.';

        if (period < 3600) {
            min = Math.trunc(period / 60) + 'мин. ';
        } else {
            min = Math.trunc((Number(period) - Number(Math.trunc(period / 3600) * 3600)) / 60) + 'мин. '
        }
        time = day + hour + min + sec;
    } else if (period > 3600) {
        hour = Math.trunc(period / 3600) + 'ч. ';
        sec = (period % 60) + 'сек.';

        if (period < 3600) {
            min = Math.trunc(period / 60) + 'мин. ';
        } else {
            min = Math.trunc((Number(period) - Number(Math.trunc(period / 3600) * 3600)) / 60) + 'мин. '
        }
        time = hour + min + sec;
    } else {
        if (period > 60) {
            time = Math.trunc(period / 60) + 'мин. ' + (period % 60) + 'сек.';
        } else {
            time = period + 'сек.'
        }
    }
    return { time, day, hour, min };
}

export const getRoundToHour = time => Math.round(time / 3600.0) + 'ч.';

export function getRangeToFrom(from, to) {
    const fromInMs = moment(from).format('x');
    if (moment(from).format('DD M') === moment(to).format('DD M')) {
        const toInMs = moment(to).add(1, 'days').format('x');
        const duration = moment.duration(toInMs - fromInMs, 'milliseconds');
        const days = duration.asDays();
        let arr = [];
        for (let i = 0; i < days; i++) {
            arr.push(moment(from).add(i, 'days'));
        }
        return arr;
    } else {
        const toInMs = moment(to).format('x');
        const duration = moment.duration(toInMs - fromInMs, 'milliseconds');
        const days = duration.asDays();
        let arr = [];
        for (let i = 0; i <= days; i++) {
            arr.push(moment(from).add(i, 'days'));
        }
        return arr;
    }
}

export const countDown = (listIncidents) => {
    const currentTime = moment();
    let diffTimeArr = listIncidents.map((item, index) => {
        let diff = currentTime - moment(item.eventTime);
        switch (true) {
            case (diff < MILLISEC_IN_MIN):
                return Math.floor(diff / 1000) + ' с';
                break;
            case (diff >= MILLISEC_IN_MIN && diff < MILLISEC_IN_HOUR):
                return Math.floor(diff / MILLISEC_IN_MIN) + ' м';
                break;
            case (diff >= MILLISEC_IN_HOUR && diff < MILLISEC_IN_TWO_DAYS):
                return diff > MILLISEC_IN_DAY ? '1 д ' + Math.floor(diff / MILLISEC_IN_HOUR - 24) + ' ч' : Math.floor(diff / MILLISEC_IN_HOUR) + ' ч';
                break;
            case (diff >= MILLISEC_IN_TWO_DAYS):
                return Math.floor(diff / MILLISEC_IN_DAY) + ' д';
                break;
            default:
                return diff;
                break;
        }
    });
    return diffTimeArr;
}