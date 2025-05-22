document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sukces:", data);
      alert("Zalogowano pomyślnie!");
      document.getElementById("result").innerText = "Zalogowano pomyślnie!";
    })
    .catch((error) => {
      console.error("Błąd:", error);
      document.getElementById("result").innerText =
        "Wystąpił błąd podczas logowania.";
    });
});

