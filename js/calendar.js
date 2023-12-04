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

    // Calculate the total number of days to display (35)
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
    return dayElement;
  }

  // Initial calendar update
  updateCalendar();
});
