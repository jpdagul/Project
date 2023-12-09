document.addEventListener("DOMContentLoaded", function () {
  // Get necessary HTML elements
  const prevMonthBtn = document.getElementById("prevMonthBtn");
  const nextMonthBtn = document.getElementById("nextMonthBtn");
  const currentMonthElement = document.getElementById("currentMonth");
  const daysContainer = document.querySelector(".days");

  // Initialize current date
  let currentDate = new Date();

  // Event listener for the previous month button
  prevMonthBtn.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
  });

  // Event listener for the next month button
  nextMonthBtn.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
  });

  // Event listener for the current month element
  currentMonthElement.addEventListener("click", function () {
    const userInput = prompt("Enter a date (YYYY-MM-DD):");
    if (userInput && userInput.length === 10) {
      const selectedDate = new Date(userInput);
      if (!isNaN(selectedDate.getTime())) {
        currentDate = selectedDate;
        updateCalendar();
      } else {
        alert("Invalid input. Please enter a valid date (YYYY-MM-DD).");
      }
    } else {
      alert("Invalid input. Please enter a date in the format YYYY-MM-DD.");
    }
  });

  // Event listener for each day element
  daysContainer.addEventListener("click", function (event) {
    const clickedDayElement = event.target;
    if (clickedDayElement.classList.contains("current-month")) {
      const day = parseInt(clickedDayElement.textContent, 10);
      const clickedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      handleDayClick(clickedDayElement, clickedDate);
    }
  });

  // Function to handle the click on a day element
  function handleDayClick(dayElement, clickedDate) {
    const existingEvents = loadEventsFromLocalStorage(clickedDate);

    const eventText = prompt(
      "Enter an event for " + clickedDate.toDateString() + ":"
    );

    if (eventText) {
      existingEvents.push(eventText);
      saveEventsToLocalStorage(clickedDate, existingEvents);

      // Update the UI
      updateCalendar();
    }
  }

  // Function to load events from local storage for a specific date
  function loadEventsFromLocalStorage(date) {
    const key = formatDateForLocalStorage(date);
    const existingEvents = JSON.parse(localStorage.getItem(key)) || [];
    return existingEvents;
  }

  // Function to save events to local storage for a specific date
  function saveEventsToLocalStorage(date, events) {
    const key = formatDateForLocalStorage(date);
    localStorage.setItem(key, JSON.stringify(events));
  }

  // Function to delete an event for a specific date
  function deleteEvent(date, eventIndex) {
    const existingEvents = loadEventsFromLocalStorage(date);

    // Ask for confirmation
    const confirmation = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmation) {
      existingEvents.splice(eventIndex, 1);
      saveEventsToLocalStorage(date, existingEvents);

      // Update the UI
      updateCalendar();
    }
  }

  // Function to format a date for local storage key
  function formatDateForLocalStorage(date) {
    return date.toISOString().split("T")[0]; // Using only the date part
  }

  // Function to update the calendar based on the current date
  function updateCalendar() {
    // Update the displayed month
    const options = { month: "long", year: "numeric" };
    currentMonthElement.textContent = currentDate.toLocaleDateString(
      "en-US",
      options
    );

    // Clear previous days
    daysContainer.innerHTML = "";

    // Get the first day of the current month
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    // Calculate the number of days in the month
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    // Calculate the day index for the first day of the month
    let dayIndex = firstDay.getDay();

    // Calculate the total number of days to display
    const totalDays = 42;

    // Create and append day elements for the previous month
    for (let i = dayIndex - 1; i >= 0; i--) {
      const prevMonthDay =
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        ).getDate() - i;
      const dayElement = createDayElement("prev-month", prevMonthDay);
      daysContainer.appendChild(dayElement);
    }

    // Create and append day elements for the current month
    for (let i = 1; i <= lastDay; i++) {
      const dayElement = createDayElement("current-month", i);
      const events = loadEventsFromLocalStorage(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
      );
      renderEventsOnDay(dayElement, events);
      daysContainer.appendChild(dayElement);
    }

    // Create and append day elements for the next month
    for (let i = 1; daysContainer.children.length < totalDays; i++) {
      const nextMonthDay = i;
      const dayElement = createDayElement("next-month", nextMonthDay);
      daysContainer.appendChild(dayElement);
    }

    // Add .today class to the current day
    const todayElement = daysContainer.querySelector(".current-month.today");
    if (todayElement) {
      todayElement.classList.add("today");
    }
  }

  // Helper function to create day elements
  function createDayElement(className, day) {
    const dayElement = document.createElement("span");
    dayElement.classList.add("day", className);
    dayElement.textContent = day;
    if (
      className === "current-month" &&
      day === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth()
    ) {
      dayElement.classList.add("today");
    }

    // Add event deletion functionality
    const eventsContainer = document.createElement("div");
    eventsContainer.classList.add("events-container");
    dayElement.appendChild(eventsContainer);

    if (eventsContainer) {
      eventsContainer.addEventListener("click", function (event) {
        const clickedEvent = event.target;
        if (clickedEvent.classList.contains("event")) {
          const eventIndex = Array.from(eventsContainer.children).indexOf(
            clickedEvent
          );
          deleteEvent(
            new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
            eventIndex
          );
        }
      });
    }

    return dayElement;
  }

  // Helper function to render events on a day element
  function renderEventsOnDay(dayElement, events) {
    const eventsContainer = dayElement.querySelector(".events-container");
    if (eventsContainer) {
      // Clear previous events
      eventsContainer.innerHTML = "";

      if (events.length > 0) {
        // Add each event to the container
        events.forEach((eventText) => {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.textContent = eventText;
          eventsContainer.appendChild(eventDiv);
        });
      }
    }
  }

  // Initial calendar update
  updateCalendar();
});

// Function to close the popup guide
function closePopup() {
  var popup = document.getElementById("popupGuide");
  popup.style.opacity = "0";

  // After a short delay, set display to none
  setTimeout(function () {
    popup.style.display = "none";
  }, 500);
}

// Function to show the popup guide with fade-in effect
function showPopup() {
  var popup = document.getElementById("popupGuide");
  popup.style.display = "flex";
  setTimeout(function () {
    popup.classList.add("show");
  }, 50);
}

// Call the showPopup function when the page loads
window.onload = showPopup;
