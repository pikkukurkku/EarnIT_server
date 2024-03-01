require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");


const app = express();
require("./config")(app);


// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);


const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const quizInputsRouter = require("./routes/quizinputs.routes");
app.use("/api", quizInputsRouter);

require("./error-handling")(app);

module.exports = app;
