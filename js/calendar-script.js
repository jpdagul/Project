/*
 *
 ****PREVIEW OF THE UNFINISHED JAVASCRIPT****
 *
 */

const monthElement = document.querySelector(".month h1");
const yearElement = document.querySelector(".month p");
const daysElement = document.querySelector(".days");

function updateCalendar() {
  const currentDate = new Date();
  const options = { month: "long", year: "numeric" };
  monthElement.textContent = currentDate.toLocaleDateString("en-US", options);
  yearElement.textContent = "";

  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  daysElement.innerHTML = "";

  for (let day = 1; day <= lastDayOfMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    daysElement.appendChild(dayElement);
  }
}

updateCalendar();
