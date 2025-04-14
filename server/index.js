const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ response: completion.data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to get response from OpenAI." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
