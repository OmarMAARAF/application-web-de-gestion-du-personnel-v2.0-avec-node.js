const express = require("express");
const app = express();
const connectDb = require("./db/Connect");
const path = require("path");
const router = require("./router/main");
const WebSocket = require("ws");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
var server1 = require("http").createServer(app);
require("dotenv").config();

//websocket configuration
const wss = new WebSocket.Server({ server: server1 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

//middleware
app.use(express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "public/templates/admin/")));
app.use(express.json());

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser());
//session middleware
/* 
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwi55566467",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
); */
//router
app.use("/api", router);

//404 and 500 pages
app.use((req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "public/templates/admin/404.html"));
  res
    .status(500)
    .sendFile(path.join(__dirname, "public/templates/admin/500.html"));
});

const port = 3000;
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    server1.listen(port, console.log(`Server listen on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
