const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nicknameForm");
const inputForm = document.querySelector("#inputForm");
const socket = new WebSocket(`ws://${window.location.host}`);
// On app.js, <socket> represents a connection to the server.

function makeMessage(type, payload) {
  const stringifiedMessage = { type, payload };
  // Make object
  return JSON.stringify(stringifiedMessage);
  // and then turn into String
  // ❗️The problem is that our backend doesn't understand javascript objects.
}

socket.addEventListener("open", () => {
  console.log("✅ Connected to server of LOOM 🍋");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("⛔️ Disonnected from Server of LOOM 🍋");
});

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = inputForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

inputForm.addEventListener("submit", handleMessageSubmit);
nicknameForm.addEventListener("submit", handleNicknameSubmit);
