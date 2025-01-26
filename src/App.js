import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeImageUrl, setMemeImageUrl] = useState(null); // Set initial state to `null`
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
    // Encode the top and bottom text to handle spaces and special characters
    const encodedTopText = encodeURIComponent(topText);
    const encodedBottomText = encodeURIComponent(bottomText);

    // Generate the meme URL with the encoded text and avoid caching issues
    const memeUrl = `https://api.memegen.link/images/${selectedTemplate}/${encodedTopText}/${encodedBottomText}.png?${new Date().getTime()}`;

    // Log the generated meme URL for debugging purposes
    console.log('Generated Meme URL:', memeUrl);

    // Update the meme image URL state
    setMemeImageUrl(memeUrl);
  };

  // Function to download the meme image
  const downloadMeme = () => {
    if (memeImageUrl) {
      const link = document.createElement('a');
      link.href = memeImageUrl; // Set the meme image URL as the download link
      link.download = 'meme.png'; // Set default file name for download
      link.click(); // Trigger the download
    }
  };

  useEffect(() => {
    // Log memeImageUrl changes for debugging
    console.log('Meme Image URL updated:', memeImageUrl);
  }, [memeImageUrl]);

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
            >
              {memeTemplates.map((template) => (
                <option key={`template-${template}`} value={template}>
                  {template.charAt(0).toUpperCase() +
                    template.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>

            {/* Generate Meme Button */}
            <button type="submit">Generate Meme</button>
          </div>
        </form>

        {/* Meme Preview (Always render image element but with null src initially) */}
        <div className="meme-output">
          <h2>Your Generated Meme:</h2>
          <img
            src={memeImageUrl || null} // Set src to null initially, or to the generated meme URL
            alt="Generated Meme"
            className="meme-image"
            data-test-id="meme-image"
          />
        </div>

        {/* Only render the Download button if memeImageUrl is set */}
        {memeImageUrl && (
          <button onClick={downloadMeme} className="download-button">
            Download
          </button>
        )}

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

export default App;
