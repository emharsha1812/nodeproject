import express from "express";

//earlier we had to do stuff like this
//const express = require("express");
//these two are equivalent

import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";
//to initialise our application
const app = express();

const PORT = 5000;

//this means we gonna use json data
app.use(bodyParser.json());

app.use("/", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello from homepage");
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
