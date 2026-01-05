// main.js

const chat = document.getElementById("chat");
const input = document.getElementById("text");
const send = document.getElementById("send");

async function askGemini(text) {
  const res = await fetch(
    curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H "Content-Type: application/json" \
  -H "X-goog-api-key: AIzaSyAbVsX62yToTQVSLXsvQ-NMh_yvwZ--UnE" \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": input
          }
        ]
      }
    ]
  }'

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

send.onclick = async () => {
  const msg = input.value.trim();
  if (!msg) return;
  addMessage(msg, "user");
  input.value = "";

  const reply = await askGemini(msg);
  addMessage(reply, "bot");
};
