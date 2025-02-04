import './App.css';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('doge');
  const [memeImageUrl, setMemeImageUrl] = useState(
    `https://memegen.link/${selectedTemplate}/_/_/_.png`,
  );

  const memeTemplates = [
    'doge',
    'drake',
    'sad-biden',
    'sad-obama',
    'spiderman',
    'firsttry',
  ];

  // Effect to update meme URL dynamically when user inputs change
  useEffect(() => {
    const memeUrl = `https://memegen.link/${selectedTemplate}/${topText || '_'}/${bottomText || '_'}.png`;
    setMemeImageUrl(memeUrl);
  }, [topText, bottomText, selectedTemplate]);

  // Handle input changes for top and bottom text
  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };

  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  // Handle template selection change
  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  // Handle the special case when user types "doge"
  const handleTemplateInputChange = (event) => {
    const inputValue = event.currentTarget.value.toLowerCase();
    if (inputValue === 'doge') {
      setSelectedTemplate('doge');
    }
  };

  // Function to download the meme image
  const downloadMeme = () => {
    const link = document.createElement('a');
    link.href = memeImageUrl;
    link.download = 'meme.png';
    link.click();
  };

  return (
    <div className="App">
      <div className="meme-generator">
        <h1>Create a Meme!</h1>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="input-container">
            {/* Top Text Label */}
            <label htmlFor="topText" className="input-label">
              Top text
            </label>
            <input
              id="topText"
              placeholder="Enter top text"
              value={topText}
              onChange={handleTopTextChange}
            />

            {/* Bottom Text Label */}
            <label htmlFor="bottomText" className="input-label">
              Bottom text
            </label>
            <input
              id="bottomText"
              placeholder="Enter bottom text"
              value={bottomText}
              onChange={handleBottomTextChange}
            />

            {/* Meme Template Selector with Label */}
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
