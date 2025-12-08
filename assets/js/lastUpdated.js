// lastUpdated.js
// update date when changes are pushed!
const lastUpdated = "12 December 2025";
const copyrightdate = "&copy; Copyright 2024 - 2025 <strong>Noël Jörg</strong>"
// insert into p tag
document.addEventListener("DOMContentLoaded", function() {
  var el = document.querySelector(".last-updated"); // p tag
  var elp = document.querySelector(".copyright")
  if (el) {
    el.textContent = "Last updated: " + lastUpdated;
  }
  if (elp) {
    elp.innerHTML = copyrightdate
  }
});

