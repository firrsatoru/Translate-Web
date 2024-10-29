const express = require("express");
const translate = require("translate-google");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Directory File Static

app.post("/translate", async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;
  try {
    const translatedText = await translate(text, { from: sourceLang, to: targetLang });
    res.json({ translation: translatedText });
  } catch (error) {
    res.status(500).json({ error: "Err Internal Server!" });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server Running At : http://localhost:${PORT}`);
});
