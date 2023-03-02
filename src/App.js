import { useState } from "react";
import axios from "axios";

function App() {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  const payload = {
    "prompt": "maltese puppy",
    "steps": 5
  }
 
  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.post(`https://324f-78-190-104-220.eu.ngrok.io/sdapi/v1/txt2img`, payload); 
    console.log(result)
    updateImage(result.data.images[0]); 
    updateLoading(false);
  };

  return (
    <div>
      <input
        value={prompt}
        onChange={(e) => updatePrompt(e.target.value)}
        className="max-w-1/2 border-red-400 border-solid px-6 py-2 bg-slate-300"
      ></input>
      <button onClick={() => generate(prompt)} colorScheme={"yellow"}>
        Generate
      </button>

      {loading ? (
        <h1>loading...</h1>
      ) : image ? (
        <img src={`data:image/png;base64,${image}`} boxShadow="lg" />
      ) : null}
    </div>
  );
}

export default App;
