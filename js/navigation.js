function toggleNav() {
  var navList = document.getElementById("nav-list");

  if (navList.classList.contains("hide")) {
    navList.classList.remove("hide");
    navList.classList.add("show");
  } else {
    navList.classList.remove("show");
    navList.classList.add("hide");
  }
}
