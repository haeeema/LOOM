import http from "http";
import { WebSocketServer } from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));
// This line is what exposes the public folder to users.
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
// NEW!! Catchall URL

const hadleListen = () =>
  console.log(`✅ Listening on http://localhost:4500 🍋`);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
// Create WebSocket server on http sever.

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anonymous";
  console.log("✅ Connected to Browser");
  socket.on("close", () => console.log("⛔️ Disconnected from Browser"));
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    switch (parsedMessage.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${parsedMessage.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = parsedMessage.payload;
        break;
      // 🔥 Put payload inside our socket. socket is basically object.
    }
  });
  // Method of socket, not method of ws.
});
// On method is going to give us some information about the person that just connectied to our backend.
// On server.js, <socket> represents the browser that just connected.

server.listen(4500, hadleListen);
// only http => app.listen(4500, handleListen);
