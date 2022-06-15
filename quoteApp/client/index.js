const saveBtn = document.querySelector(".save");
const loadBtn = document.querySelector(".load");
// Event listeners

saveBtn.addEventListener("click", () => (window.location.href = "./form.html"));

loadBtn.addEventListener(
  "click",
  () => (window.location.href = "./display.html")
);
// functions
