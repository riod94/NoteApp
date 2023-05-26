const DateChanger = {
  ToDateID(date, separator = '-') {
    return date.split(separator).reverse().join(separator);
  },
  ToDateTimeID(dateTime = '2000-01-01', separator = '-') {
    const val = dateTime.split(' ');
    const date = val[0].split(separator).reverse().join(separator);
    const time = val.length > 1 ? ' ' + val[1] : '';
    return date + time;
  },
  ToDate(date) {
    const convDate = new Date(date);
    const Y = convDate.getFullYear();
    let M = convDate.getMonth() + 1;
    M = M < 10 ? '0' + M : M;
    let D = convDate.getDate();
    D = D < 10 ? '0' + D : D;

    return Y + '-' + M + '-' + D;
  },
  ToDateTime(dateTime) {
    const convDate = new Date(dateTime);
    const Y = convDate.getFullYear();
    let M = convDate.getMonth() + 1;
    M = M < 10 ? '0' + M : M;
    let D = convDate.getDate();
    D = D < 10 ? '0' + D : D;

    let date = Y + '-' + M + '-' + D;

    let H = convDate.getHours();
    H = H < 10 ? '0' + H : H;
    let I = convDate.getMinutes();
    I = I < 10 ? '0' + I : I;
    let S = convDate.getSeconds();
    S = S < 10 ? '0' + S : S;
    const time = ' ' + H + ':' + I + ':' + S;
    return date + time;
  },
  MonthToString(value, option) {
    return convertToMonthString(value, option);
  },
  DayToString(value) {
    return convertToDayString(value);
  },
  DayToStringWithTime(value) {
    return convertToDayString(value, true);
  },
  Today() {
    return new Date();
  },
  TodayString() {
    return convertToToday();
  },
  TodayStringWithTime() {
    return convertToToday('withTime');
  },
  TodayTimeStamp() {
    return Math.floor(Date.now() / 1000);
  },
  isBefore(dirtyDate, dirtyDateToCompare) {
    var date = toDate(dirtyDate);
    var dateToCompare = toDate(dirtyDateToCompare);
    return date.getTime() < dateToCompare.getTime();
  },
  isAfter(dirtyDate, dirtyDateToCompare) {
    var date = toDate(dirtyDate);
    var dateToCompare = toDate(dirtyDateToCompare);
    return date.getTime() > dateToCompare.getTime();
  },
  Yesterday() {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
  },
  Tomorrow() {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  },
  BeforeDay(dayAmount) {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - dayAmount);
    return newDate;
  },
  NextDay(dayAmount) {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + dayAmount);
    return newDate;
  },
  Greetings(date = null) {
    let myDate = date ? new Date(date) : new Date();
    let hours = myDate.getHours();
    let greet = 'Selamat ';

    if (hours < 11) {
      greet += 'Pagi';
    } else if (hours >= 11 && hours < 15) {
      greet += 'Siang';
    } else if (hours >= 15 && hours < 18) {
      greet += 'Sore';
    } else if (hours >= 18 && hours <= 24) {
      greet += 'Malam';
    } else {
      greet = '';
    }

    return greet;
  },
};

const convertToMonthString = (value, opt) => {
  let Y = new Date(value).getFullYear();
  let D = new Date(value).getDate();
  D = D < 10 ? '0' + D : D;
  let getMonth = new Date(value).getMonth();
  let M = LIST.MONTH[getMonth];
  if (opt === 'short') {
    M = LIST.SHORT_MONTH[getMonth];
  }

  const monthString = D + ' ' + M + ' ' + Y;
  return monthString;
};

const convertToDayString = (value, withTime = false) => {
  let date = convertToMonthString(value);
  const dateValue = new Date(value);
  let day = dateValue.getDay();
  day = LIST.DAY[day];

  let dateString = day + ', ' + date;
  if (withTime) {
    let H = dateValue.getHours();
    H = H < 10 ? '0' + H : H;
    let I = dateValue.getMinutes();
    I = I < 10 ? '0' + I : I;
    let S = dateValue.getSeconds();
    S = S < 10 ? '0' + S : S;
    dateString = dateString + ' ' + H + ':' + I + ':' + S;
  }
  return dateString;
};

const convertToToday = type => {
  const currentDate = new Date();
  const Y = currentDate.getFullYear();
  let M = currentDate.getMonth() + 1;
  M = M < 10 ? '0' + M : M;
  let D = currentDate.getDate();
  D = D < 10 ? '0' + D : D;

  let today = Y + '-' + M + '-' + D;

  if (type) {
    let H = currentDate.getHours();
    H = H < 10 ? '0' + H : H;
    let I = currentDate.getMinutes();
    I = I < 10 ? '0' + I : I;
    let S = currentDate.getSeconds();
    S = S < 10 ? '0' + S : S;
    today = today + ' ' + H + ':' + I + ':' + S;
  }
  return today;
};

const LIST = {
  SHORT_MONTH: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ],
  MONTH: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  DAY: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'],
};

const toDate = argument => {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (
    argument instanceof Date ||
    (typeof argument === 'object' && argStr === '[object Date]')
  ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if (
      (typeof argument === 'string' || argStr === '[object String]') &&
      typeof console !== 'undefined'
    ) {
      console.warn(
        "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule",
      );
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
};

export default DateChanger;
