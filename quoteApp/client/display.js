const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  autoplay: {
    delay: 5000,
    loop: true,
  },
});
const form = document.querySelector(".form");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const categories = document.querySelector("#select__category");
// Event listeners
form.addEventListener("submit", loadData);

// functions

async function loadData(e) {
  e.preventDefault();
  swiperWrapper.innerHTML = "";
  const category = categories.value.toLowerCase();
  const url =
    category == "all"
      ? "http://localhost:8000/quotesaver.com/api/quotes"
      : `http://localhost:8000/quotesaver.com/api/quotes/${category}`;
  const data = await fetch(url);
  const quotes = await data.json();
  display(quotes);
}

function display(arr) {
  arr.forEach((quote) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `<p>${quote.body}</p>
            <span>${quote.author}</span>`;
    swiperWrapper.appendChild(slide);
  });
}
