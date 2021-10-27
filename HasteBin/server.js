const express = require("express");

const app = express();
//to set views
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const Document = require("./models/Document");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/hastebin", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//important thing about ejs is that we can send information from the server to the client
const code = `Welcome to Pastebin

A new way to share code with your friends and colleagues

This is a wonderful way to share clean code`;
app.get("/", (req, res) => {
  res.render("code-display", { code, language: "plaintext" });
});

app.get("/new", (req, res) => {
  res.render("new", { code });
});

app.post("/save", async (req, res) => {
  const value = req.body.value;
  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`);
  } catch (e) {
    res.render("new", { value });
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const document = await Document.findById(id);
    res.render("code-display", { code: document.value, id });
  } catch (error) {
    res.redirect("/");
  }
});

app.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id;

  try {
    const document = await Document.findById(id);
    res.render("new", { value: document.value });
  } catch (error) {
    res.redirect(`/${id}`);
  }
});
app.listen(3000);
