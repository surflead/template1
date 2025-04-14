import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResponse("");

    const fullPrompt = `${prompt}\n\nClient message:\n${message}`;

    try {
      const res = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: fullPrompt,
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      setResponse(data.choices?.[0]?.text || "Нет ответа.");
    } catch (err) {
      setResponse("Ошибка генерации.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>SurfLead AI-ответчик</h1>

      <label>Ваш промпт:</label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
        style={{ width: "100%", marginBottom: "20px" }}
        placeholder="Например: Если клиент спрашивает про мувинг, ответь как компания SurfLead..."
      />

      <label>Сообщение от клиента:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "20px" }}
        placeholder="Пример: Сколько стоит переезд из Майами в Орландо?"
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Генерация..." : "Сгенерировать ответ"}
      </button>

      {response && (
        <div style={{ marginTop: "30px", background: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
          <strong>Ответ:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
