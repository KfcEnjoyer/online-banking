const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const authRoute = require('./routes/Authenticate');
app.use('/auth', authRoute);


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
