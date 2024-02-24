import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function Home() {
  const [englishText, setEnglishText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    try {
      const response = await axios.post("/api/translate", {
        text: englishText,
      });
      setTranslatedText(response.data.translation);
      setError("");
    } catch (error) {
      setError("Error translating text. Please try again.");
      console.error("Error translating text:", error);
    }
  };

  const handleClear = () => {
    setEnglishText("");
    setTranslatedText("");
    setError("");
  };

  return (
    <>
      <Header />
      <div className="container">
        <textarea
          className="textarea"
          value={englishText}
          onChange={(e) => setEnglishText(e.target.value)}
          placeholder="Enter English text to translate"
        />
        <div className="button-container">
          <button className="button translate" onClick={handleTranslate}>
            Translate
          </button>
          <button className="button clear" onClick={handleClear}>
            Clear
          </button>
        </div>

        {translatedText && (
          <div className="translated-text">
            <h2 className="translated-heading">Translated Text:</h2>
            <p className="translated-paragraph">{translatedText}</p>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
}
