const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const middleware = [
  morgan("dev"),
  cors(),
  express.json({ limit: "10mb" }),
  express.urlencoded({ extended: true, limit: "10mb" }),
];

module.exports = middleware;
