const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const profile = require("./routes/Profile");
app.use('/profile', profile);
const authRoute = require('./routes/Authenticate');
app.use('/auth', authRoute);
const openAccount = require("./routes/openAccount");
app.use("/openaccount", openAccount);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
