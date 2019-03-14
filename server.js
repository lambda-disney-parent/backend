//Dependencies
const express = require("express"),
  helmet = require("helmet"),
  cors = require("cors");

//Server to point to
const server = express();

// Cors Config
const corsConfig = {
  credentials: true,
  origin: true
};
//Library Middleware
server.use(helmet(), express.json(), cors(corsConfig));

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Credentials",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
