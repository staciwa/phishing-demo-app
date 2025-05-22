document.getElementById("loginForm").addEventListener("submit", function(e) {
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
      window.location.href = "https://www.linkedin.com/";
    })
    .catch((error) => {
      console.error("Błąd:", error);
    });
});

