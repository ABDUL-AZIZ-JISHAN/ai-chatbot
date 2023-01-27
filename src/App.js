import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import './App.css';

function App() {

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  })

  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);


  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 3000,
      })
      setResult(response.data.choices[0].text)
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
  }


  return (
    <main className="app">
      <div className="content">
        <h1>AI ChatBot</h1>
        <div className="prompt">
          <textarea type="text" value={prompt} onKeyDown={(e) => {
            e.key === "Enter" && setPrompt(e.target.value)
          }} onChange={(e) => setPrompt(e.target.value)} placeholder="write your command"></textarea>
          <button onClick={handleClick} disabled={loading || prompt.length === 0}>{loading ? 'generating....' : "generate"}</button>
        </div>
      </div>
      <div className="result">
        <pre>{result || "Please command me..."}</pre>
      </div>
    </main>
  )

}


export default App;
