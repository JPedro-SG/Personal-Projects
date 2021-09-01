
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import './App.css';
const synth = window.speechSynthesis;
const allVoices = synth.getVoices()

function App() {
  // falar nada error
  const commands = [
    {
    command: 'tell me a joke',
    callback: () => {
      fetchJoke()
    }
  },
  {
    command: 'conte uma piada',
    callback: () => {
      fetchJoke()
    }
  },
  {
    command: 'repeat',
    callback: () => {
      repeatJoke()
    }
  },
  {
    command: 'repetir',
    callback: () => {
      repeatJoke()
    }
  },
  {
    command: 'stop',
    callback: () => {
      setIsListening(false)
      SpeechRecognition.stopListening()
    }
  },
  {
    command: 'pare',
    callback: () => {
      setIsListening(false)
      SpeechRecognition.stopListening()
      resetTranscript()
    }
  },
  {
    command: '*',
    callback: () => {
      if(transcript.split(' ').length > 3) resetTranscript()
    }
  },
 ]
  const [joke, setJoke] = useState({})
  const [isListening, setIsListening] = useState(false)
  const { transcript, resetTranscript } = useSpeechRecognition({commands});

  const handleKeyPress = (e) => {
    // K or k
    if(e.keyCode === 75) {
      fetchJoke()
    }
    // R or r
    if(e.keyCode === 82) {
      repeatJoke()
    }

}

const repeatJoke = _ => tellJoke()

const tellJoke = () => {
  if(joke && SpeechRecognition.browserSupportsSpeechRecognition()) {
    const setup = new SpeechSynthesisUtterance(joke.setup)
    setup.voice = allVoices[1]
    synth.speak(setup)

    setTimeout(() => { // wait certain time to say the punchline
      const punchline = new SpeechSynthesisUtterance(joke.punchline)
      punchline.voice = allVoices[1]
      synth.speak(punchline)
    }, 500);
  }
}

const fetchJoke = () => {
  fetch("https://official-joke-api.appspot.com/jokes/programming/random")
    .then(response => response.json())
    .then(data => setJoke({...data[0]}))
}
  

  useEffect(() => {
    tellJoke()
    window.addEventListener('keydown', handleKeyPress, true)

    return () => window.removeEventListener('keydown', handleKeyPress, true)
  }, [joke])

  const startOrStopListening = () => {
    if(!isListening) {
      resetTranscript()
      SpeechRecognition.startListening({continuous: true})
    }
    else SpeechRecognition.stopListening()
    setIsListening(!isListening)
  }

  

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="App">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div onClick={startOrStopListening} className={"speech" + (isListening ? " on" : "")}>
          <p>Tap or click here when you're ready to start talking 
            <br/><span>You just said: {transcript}</span>
          </p>
        </div>
        <p >Press K to play a new joke and R to repeat the last joke</p>
        <button onClick={fetchJoke}>Tell me a joke</button>
      </div>
    </div>
  );
}

export default App;
