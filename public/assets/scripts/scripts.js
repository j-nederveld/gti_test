/*
Make sure that config.js is set up in the scripts folder with the client_id and api_key
*/
const client_id = config.CLIENT_ID;
const api_key = config.MY_KEY;
const locationID = "204D5F25";
let tokenID;
let dateRange = [];
let labels = [];

//create the chart which will be updated when a date range is selected
var ctx = document.getElementById("myChart").getContext("2d");

var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "# of Events",
        backgroundColor: 'rgb(53, 196, 158)',
        data: [],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

$.getJSON(
  "https://appsrv.fastsensor.us:8890/oauth2/token?client_id=" +
    client_id +
    "&api_key=" +
    api_key
)
  .done(function (data) {
    tokenID = data.access_token;
  })
  .fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });

//set up range selector
var picker = new Litepicker({
  element: document.getElementById("litepicker"),
  firstDay: 1,
  lang: "en-US",
  numberOfMonths: 2,
  numberOfColumns: 2,
  minDate: null,
  maxDate: null,
  minDays: null,
  maxDays: null,
  selectForwar: false,
  selectBackward: false,
  splitView: false,
  inlineMode: false,
  singleMode: false,
  autoApply: true,
  showWeekNumbers: false,
  showTooltip: true,
  disableWeekends: false,
  mobileFriendly: true,
  onSelect: function (date1, date2) {
    formatDate(date1);
    formatDate(date2);
    getData();
  },
});

//get data from the API
function getData() {
  //only call if there is a start/end date
  if (dateRange.length !== 2) {
    return;
  }
  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + tokenID);
    },
  });
  $.getJSON(
    "https://appsrv.fastsensor.us:8890/v1/locations/" + locationID + "/alerts",
    {
      start_date: dateRange[0],
      end_date: dateRange[1],
      selector: "[ADAM]",
    }
  )
    .done(function (res) {
      //clear graph labels
      labels = [];
      for (let i = 0; i < res.data.length; i++) {
        convertTimeStamp(res.data[i].timestamp);
      }
    })
    .then(() => {
      sortEvents(labels);
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });
}

function formatDate(date) {
  //empty the array if there is a preexisting range
  if (dateRange.length === 2) {
    dateRange = [];
  }

  //format the output into YYYY-MM-DD
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  //add the start/end dates to the array
  dateRange.push([year, month, day].join("-"));
  return [year, month, day].join("-");
}

//convert the data timestamps to use for chart labels
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
  labels.push(time);
}

//sort through the responses. dates will be the dates with any duplicates removed, and eventCount will count the number of events associated with each date by counting how many times each date occurred.
function sortEvents(events) {
  var dates = [],
    eventCount = [],
    prev;
  events.sort();
  for (var i = 0; i < events.length; i++) {
    if (events[i] !== prev) {
      dates.push(events[i]);
      eventCount.push(1);
    } else {
      eventCount[eventCount.length - 1]++;
    }
    prev = events[i];
  }
  addData(dates, eventCount);
}

//update the chart with the sorted data
function addData(labels, data) {
  myChart.data.datasets[0].data = data;
  myChart.data.labels = labels;
  myChart.update();

}
