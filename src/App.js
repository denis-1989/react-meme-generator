import './App.css';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('doge');
  const [memeImageUrl, setMemeImageUrl] = useState('');

  const memeTemplates = [
    'doge',
    'drake',
    'sad-biden',
    'sad-obama',
    'spiderman',
    'firsttry',
  ];

  // Function to format text (replace spaces with underscores)
  const formatText = (text) => (text ? text.replace(/ /g, '_') : '_');

  // Effect to update meme URL dynamically when user inputs change
  useEffect(() => {
    const memeUrl = `https://api.memegen.link/images/${selectedTemplate}/${formatText(topText)}/${formatText(bottomText)}.png`;
    setMemeImageUrl(memeUrl);
  }, [topText, bottomText, selectedTemplate]);

  // Handle template input change (when user types in the select field)
  const handleTemplateInputChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue === 'doge') {
      setSelectedTemplate('doge');
    }
  };

  // Handle input changes
  const handleTopTextChange = (event) => setTopText(event.target.value);
  const handleBottomTextChange = (event) => setBottomText(event.target.value);
  const handleTemplateChange = (event) =>
    setSelectedTemplate(event.target.value);

  // Function to download the meme image
  const downloadMeme = async () => {
    try {
      const response = await fetch(memeImageUrl);
      const blob = await response.blob();
      const link = document.createElement('a');

      link.href = URL.createObjectURL(blob);
      link.download = 'meme.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading meme:', error);
    }
  };

  return (
    <div className="App">
      <div className="meme-generator">
        <h1>Create a Meme!</h1>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="input-container">
            <label htmlFor="topText" className="input-label">
              Top text
            </label>
            <input
              id="topText"
              placeholder="Enter top text"
              value={topText}
              onChange={handleTopTextChange}
            />

            <label htmlFor="bottomText" className="input-label">
              Bottom text
            </label>
            <input
              id="bottomText"
              placeholder="Enter bottom text"
              value={bottomText}
              onChange={handleBottomTextChange}
            />

            <label htmlFor="template" className="input-label">
              Meme template
            </label>
            <select
              id="template"
              value={selectedTemplate}
              onChange={handleTemplateChange}
              onInput={handleTemplateInputChange}
            >
              {memeTemplates.map((template) => (
                <option key={`template-${template}`} value={template}>
                  {template.charAt(0).toUpperCase() +
                    template.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* Meme Preview */}
        <div className="meme-output">
          <h2>Your Generated Meme:</h2>
          <img
            src={memeImageUrl}
            alt="Generated Meme"
            className="meme-image"
            data-test-id="meme-image"
          />
        </div>

        {/* Download Meme Button */}
        <button onClick={downloadMeme} className="download-button">
          Download
        </button>

        {/* Logo Display */}
        <div className="logo-container">
          <img
            src="https://memegen.link/favicon.ico"
            alt="Memegen Logo"
            className="logo"
          />
        </div>
      </div>
    </div>
  );
}
