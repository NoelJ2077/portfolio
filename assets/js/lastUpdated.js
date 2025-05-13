// lastUpdated.js
// update when page is updated!
const lastUpdated = "13 Mai 2025";
// insert into p tag
document.addEventListener("DOMContentLoaded", function() {
  var el = document.querySelector(".last-updated"); // p tag
  if (el) {
    el.textContent = "Last updated: " + lastUpdated;
  }
});
