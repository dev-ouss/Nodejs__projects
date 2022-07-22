const author = document.getElementById("author");
const category = document.getElementById("select__category");
const quote = document.getElementById("quote");
const form = document.querySelector(".form");

// event listener

form.addEventListener("submit", postData);

// function
async function postData(e) {
  e.preventDefault();
  const data = {
    body: quote.value,
    author: author.value,
    category: category.value,
  };
  fetch("http://localhost:8000/quotesaver.com/api/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  e.target.reset();
  const formWrapper = form.parentElement;
  const submitTxt = document.createElement("p");
  submitTxt.textContent = "Quote submitted!";
  submitTxt.style.color = "green";
  submitTxt.style.position = "absolute";
  submitTxt.style.top = "105%";
  submitTxt.style.left = "30%";
  formWrapper.appendChild(submitTxt);
}
