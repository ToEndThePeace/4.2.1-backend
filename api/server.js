const express = require("express");
const cors = require("cors");
const server = express();

const accountsRouter = require("./routers/accountsRouter");

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server running!" });
});

server.use("/api/accounts", accountsRouter);

module.exports = server;
