// main.js

const API_KEY = "AIzaSyAbVsX62yToTQVSLXsvQ-NMh_yvwZ--UnE"; // ←あとで書き換え

async function askGemini(text) {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text }]
        }]
      })
    }
  );
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

const chat = document.getElementById("chat");
const input = document.getElementById("text");
const send = document.getElementById("send");

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
