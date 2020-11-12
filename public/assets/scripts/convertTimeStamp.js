function convertTimeStamp(timestamp) {
  var a = new Date(timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var day = a.getDate();
  var time = day + " " + month + " " + year;
  console.log(time);
  return time;
}

module.exports = convertTimeStamp;
