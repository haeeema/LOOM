const socket = new WebSocket(`ws://${window.location.host}`);
// On app.js, <socket> represents a connection to the server.

socket.addEventListener("open", () => {
  console.log("✅ Connected to server of LOOM 🍋");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data, " from th server");
});

socket.addEventListener("close", () => {
  console.log("⛔️ Disonnected from Server of LOOM 🍋");
});
