// We reuse this import in order to have access to the `body` property in requests
const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const cors = require("cors");

module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: ["http://localhost:5173", "https://homepage--visionary-dieffenbachia-36ce76.netlify.app", "https://visionary-dieffenbachia-36ce76.netlify.app"],
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
