const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS in allowed methods
  allowedHeaders: ["Authorization", "Content-Type"], // Allow necessary headers
};

app.use(cors(corsOptions));

const db = require("./models");

// Routers
const profile = require("./routes/Profile");
app.use('/profile', profile);
const authRoute = require('./routes/Authenticate');
app.use('/auth', authRoute);
const openAccount = require("./routes/openAccount");
app.use("/openaccount", openAccount);
const transfer = require("./routes/Transfer");
app.use("/transfer", transfer);
const details = require("./routes/AccountDetails");
app.use("/accounts", details);
const transaction = require("./routes/Transaction");
app.use("/transactions", transaction);
const stocks = require('./routes/Stocks');
app.use('/api/stocks', stocks);



db.sequelize.sync().then(() => {
  app.listen(3001, "172.24.2.169", () => {
    console.log("Server running on port 3001");
  });
});
