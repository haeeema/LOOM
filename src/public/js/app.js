const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);
// On app.js, <socket> represents a connection to the server.

socket.addEventListener("open", () => {
  console.log("✅ Connected to server of LOOM 🍋");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("⛔️ Disonnected from Server of LOOM 🍋");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
