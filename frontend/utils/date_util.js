// NB: this file is complete - you do not to write/edit anything!

export const formatDate = date => {
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };
  const daysOfWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const obj = new Date(date);
  const month = months[obj.getMonth()];
  const day = obj.getDate();
  const year = obj.getFullYear();
  const dayOfWeek = daysOfWeek[obj.getDay()];
  return `${month} ${day}, ${year} (${dayOfWeek})`;
};

export const formatTime = date => {
  const obj = new Date(date);
  const fullHours = obj.getHours();
  let hours = fullHours % 12;
  if (hours === 0) hours = 12;
  const minutes = obj.getMinutes();
  const tmp = `0${minutes}`;
  const paddedMinutes = tmp.slice(tmp.length - 2);
  const ampm = fullHours < 12 || fullHours === 0 ? 'am' : 'pm';
  return `${hours}:${paddedMinutes}${ampm}`;
};

export const formatDateTime = date => (
  `${formatDate(date)} ${formatTime(date)}`
);

export const timeSince = date => {
  if (typeof date !== 'object') {
    date = new Date(date);
  }

  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return interval + ' ' + intervalType;
};

// export const timeSince = date => {

//   let seconds = Math.floor((new Date() - date) / 1000);

//   let interval = Math.floor(seconds / 31536000);

//   if (interval > 1) {
//     return interval + " years";
//   }
//   interval = Math.floor(seconds / 2592000);
//   if (interval > 1) {
//     return interval + " months";
//   }
//   interval = Math.floor(seconds / 86400);
//   if (interval > 1) {
//     return interval + " days";
//   }
//   interval = Math.floor(seconds / 3600);
//   if (interval > 1) {
//     return interval + " hours";
//   }
//   interval = Math.floor(seconds / 60);
//   if (interval > 1) {
//     return interval + " minutes";
//   }
//   return Math.floor(seconds) + " seconds";
// };

// var aDay = 24*60*60*1000
// console.log(timeSince(new Date(Date.now()-aDay)));
// console.log(timeSince(new Date(Date.now()-aDay*2)));