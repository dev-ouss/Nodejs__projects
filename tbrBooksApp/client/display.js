const lists = document.querySelectorAll(".list");

// lists toggling
lists.forEach((list) => {
  const learnMoreBtn = list.querySelector(".list__btn");
  learnMoreBtn.addEventListener("click", () => {
    list.classList.toggle("show__list");
    lists.forEach((item) => {
      if (item != list) {
        item.classList.remove("show__list");
      }
    });
  });
});
