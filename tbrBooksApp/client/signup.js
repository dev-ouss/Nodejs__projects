const signUp = document.getElementById("signup");
const name = signUp.querySelector(".name");
const email = signUp.querySelector(".email");
const password = signUp.querySelector(".password");

signUp.addEventListener("submit", postUser);

async function postUser(e) {
  e.preventDefault();
  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  // posting new user
  const res = await fetch("http://localhost:8000/tbr.com/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // clear form
  signUp.reset();
  // save user to local storage
  if (res.status == 200) {
    const user = await res.json();

    localStorage.setItem("userEmail", `${user.email}`);
    localStorage.setItem("userName", `${user.name}`);
    localStorage.setItem("token", `${user.token}`);
    window.location.href = "./display.html";
    return;
  } else {
    // warning message
    warningMessage(res);
  }
}

function warningMessage(res) {
  const text = document.createElement("p");
  text.textContent = "Something went wrong, please try again.";
  text.style.color = "red";
  text.style["font-family"] = "roboto";
  if (res.status == 409) {
    text.textContent = "User already registered.";
  }
  if (!signUp.parentElement.querySelector("p")) {
    signUp.parentElement.appendChild(text);
  } else {
    signUp.parentElement.querySelector("p").replaceWith(text);
  }
}
