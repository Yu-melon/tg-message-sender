const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

// Telegram Bot Token
const BOT_TOKEN = "你的 Telegram Bot Token";

// Route for sending messages
app.post("/send-message", async (req, res) => {
  const { chatId, message } = req.body;

  if (!chatId || !message) {
    return res.status(400).json({ error: "Chat ID 和 Message 都是必須的" });
  }

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const data = await response.json();
    if (data.ok) {
      res.status(200).json({ success: true, message: "消息已發送" });
    } else {
      res.status(400).json({ success: false, error: data.description });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
