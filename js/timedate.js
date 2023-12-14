function updateDateTime() {
  var currentDate = new Date();

  var year = currentDate.getFullYear();
  var month = padZero(currentDate.getMonth() + 1);
  var day = padZero(currentDate.getDate());
  var hours = padZero(currentDate.getHours());
  var minutes = padZero(currentDate.getMinutes());
  var seconds = padZero(currentDate.getSeconds());

  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  var dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
  document.getElementById("datetime").textContent = dateTimeString;
}

function padZero(number) {
  return (number < 10 ? "0" : "") + number;
}

setInterval(updateDateTime, 1000);

updateDateTime();
