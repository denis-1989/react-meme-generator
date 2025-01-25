import './App.css';
import React, { useState } from 'react';

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeImageUrl, setMemeImageUrl] = useState(
    'https://memegen.link/drake/hi/folks.png',
  );
  const [selectedTemplate, setSelectedTemplate] = useState('doge');

  const memeTemplates = [
    'doge',
    'drake',
    'sad-biden',
    'sad-obama',
    'spiderman',
    'firsttry',
  ];

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

  // Generate meme image URL based on selected template and input text
  const generateMeme = () => {
    const memeUrl = `https://api.memegen.link/images/${selectedTemplate}/${topText}/${bottomText}.png`;
    setMemeImageUrl(memeUrl);
  };

  // Handle the special case when user types "doge"
  const handleTemplateInputChange = (event) => {
    const inputValue = event.currentTarget.value;
    if (inputValue.toLowerCase() === 'doge') {
      setSelectedTemplate('doge'); // Automatically select "doge" template
    }
  };

  // Function to download the meme image
  const downloadMeme = () => {
    const link = document.createElement('a');
    link.href = memeImageUrl; // Set the meme image URL as the download link
    link.download = 'meme.png'; // Set default file name for download
    link.click(); // Trigger the download
  };

  return (
    <div className="App">
      <div className="meme-generator">
        <h1>Create a Meme!</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            generateMeme();
          }}
        >
          <div className="input-container">
            {/* Top Text Label */}
            <label htmlFor="topText" className="input-label">
              Top text
            </label>
            <input
              id="topText"
              placeholder="Enter top text"
              value={topText} // Controlled input
              onChange={handleTopTextChange} // Update state on input change
            />

            {/* Bottom Text Label */}
            <label htmlFor="bottomText" className="input-label">
              Bottom text
            </label>
            <input
              id="bottomText"
              placeholder="Enter bottom text"
              value={bottomText} // Controlled input
              onChange={handleBottomTextChange} // Update state on input change
            />

            {/* Meme Template Selector with Label */}
            <label htmlFor="template" className="input-label">
              Meme template
            </label>
            <select
              id="template"
              value={selectedTemplate}
              onChange={handleTemplateChange} // Change template on selection
              onInput={handleTemplateInputChange} // Detect user input for special cases
            >
              {memeTemplates.map((template) => (
                <option key={`template-${template}`} value={template}>
                  {template.charAt(0).toUpperCase() +
                    template.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>

            {/* Generate Meme Button */}
            <button>Generate Meme</button>
          </div>
        </form>
        {/* Meme Preview */}
        <div className="meme-output">
          <h2>Your Generated Meme:</h2>
          <img
            src={memeImageUrl}
            alt="Generated Meme"
            className="meme-image"
            data-test-id="meme-image" // Adding the data-test-id attribute
          />
        </div>

        <button onClick={generateMeme} data-test-id="generate-meme">
          Generate meme
        </button>

        {/* Logo Display */}
        <div className="logo-container">
          {/* External logo from Memegen */}
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

export default App;
