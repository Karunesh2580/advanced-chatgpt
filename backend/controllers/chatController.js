const axios = require("axios");

exports.sendMessage = async (req, res) => {
  console.log("🔥 CHAT API HIT");
  try {
    const { message } = req.body;

    const response = await axios.post(
      "http://127.0.0.1:11434/api/generate",
      {
        model: "phi3", // 🔥 faster model (llama3 se fast)
        prompt: `Answer in short (max 3-4 lines). Be fast and concise.\n\nQuestion: ${message}`, // 🔥 short answer
        stream: false,
        options: {
          num_predict: 80,   // 🔥 limit output → speed increase
          temperature: 0.7   // balanced response
        }
      }
    );

    res.json({ reply: response.data.response });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ reply: "⚠️ Ollama error" });
  }
};