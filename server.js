//Dependencies
const express = require("express"),
  helmet = require("helmet"),
  cors = require("cors");

//Server to point to
const server = express();

//Library Middleware
server.use(helmet(), express.json(), cors());

//Routes
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

//API Endpoints
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/posts", postRouter);

//Default Endpoints
server.get("/", (req, res) => {
  res.send("It works!");
});

module.exports = server;
