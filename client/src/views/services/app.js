const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());

app.listen(3000);
app.use("/users",require("./routes/users"));




