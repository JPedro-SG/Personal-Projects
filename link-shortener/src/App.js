import './App.css';
import React, { useState } from 'react'
import ClipboardJS from 'clipboard';


function App() {
  new ClipboardJS('.btn')
  const [value, setValue] = useState('')
  const [output, setOutput] = useState('Your result will be displayed here')
    

  const submitLink = () => {
      fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
          'Content-Type': 'application/json'
      },
          body: JSON.stringify({ "long_url": value, "domain": "bit.ly" })
      }).then(res => res.json())
      .then(data => setOutput(data.link || 'Something went wrong'));
  }

  return (
    <div className="App">
      <div className='input-field-container'>
          <input 
              value={value} 
              onChange={ e => setValue(e.target.value)} className='input-field' 
              type='text' 
              placeholder='Your url goes here' 
          />
          <button onClick={submitLink} type='submit'>Shorten</button>
      </div>
      <div className='output-field-container'>
            <p id="output">{output}</p>
            <button className="btn" data-clipboard-target="#output">copy</button>
        </div>
    </div>
  );
}

export default App;
