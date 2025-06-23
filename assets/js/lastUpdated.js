// lastUpdated.js
// update date when changes are pushed!
const lastUpdated = "24 June 2025";
// insert into p tag
document.addEventListener("DOMContentLoaded", function() {
  var el = document.querySelector(".last-updated"); // p tag
  if (el) {
    el.textContent = "Last updated: " + lastUpdated;
  }
});
