const login = document.getElementById("login");
const email = login.querySelector(".email");
const password = login.querySelector(".password");
const submitBtn = document.querySelector(".signup__btn");

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("userId")) {
    setTimeout(() => {
      window.location.href = "./display.html";
    }, 1000);
  }
});

// login event listener
login.addEventListener("submit", async (e) => {
  e.preventDefault();
  // posting authentification request
  const data = {
    email: email.value,
    password: password.value,
  };
  const res = await fetch("http://localhost:8000/tbr.com/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status != 200) {
    const text = document.createElement("p");
    text.textContent = "Invalid email or password!";
    text.style.color = "red";
    text.style["font-family"] = "roboto";
    login.parentElement.appendChild(text);
    //clear form
    login.reset();
    return;
  }

  const user = await res.json();

  localStorage.setItem("userName", `${user.user.name}`);
  localStorage.setItem("userEmail", `${user.user.email}`);
  localStorage.setItem("token", `${user.token}`);

  //clear form
  login.reset();
  // change document
  window.location.href = "./display.html";
});

submitBtn.addEventListener("click", () => {
  window.location.href = "./signup.html";
});
