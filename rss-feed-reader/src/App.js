import { useEffect, useState } from 'react';
import './App.css'; 
import Card from './Card';
let Parser = require('rss-parser')



function App() {
  let parser = new Parser()
  const [feeds, setFeeds] = useState([])
  const [url, setUrl] = useState('')
  const [msg, setMsg] = useState('⬆️')
    

  const submit = async () => {
    setMsg('⌛')
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
    try {
      let response = await parser.parseURL(CORS_PROXY + `${url}`)
      setFeeds([...response.items] || [])
      console.log(response.items[0])
      setMsg('⬆️')
    } catch (error) {
      setFeeds([])
      setMsg('😢')
    }
  }  

  return ( 
    <div className="App">
        <div className="header">
          <input onChange={(e) => setUrl(e.target.value)} value={url} placeholder="http://" type="url" />
          <button  onClick={submit} type="submit">Add</button>
        </div>

        {feeds.length !== 0 
        ? <div className="content">
            {feeds.map((feed) => {
              return (
                <Card key={`${feed.id}`} feed={feed} />
              )
            })}
          </div>
        : <span className="msg">{msg}</span>
      }
    </div>
  );
}

export default App;
