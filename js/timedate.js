// Time and Date Function
function updateDateTime() {
  // Get the current date and time
  var currentDate = new Date();

  // Extract the components
  var year = currentDate.getFullYear();
  var month = padZero(currentDate.getMonth() + 1); // Months are 0-based
  var day = padZero(currentDate.getDate());
  var hours = padZero(currentDate.getHours());
  var minutes = padZero(currentDate.getMinutes());
  var seconds = padZero(currentDate.getSeconds());

  // Determine AM or PM
  var ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12;

  // Display the date and time with AM/PM
  var dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
  document.getElementById("datetime").textContent = dateTimeString;
}

// Add leading zero to single-digit numbers
function padZero(number) {
  return (number < 10 ? "0" : "") + number;
}

// Update the date and time every second
setInterval(updateDateTime, 1000);

// Initial update
updateDateTime();
