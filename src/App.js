import React, { useState } from 'react';
import * as ml5 from 'ml5';
import './App.css';
import './variables.css'

function App() {

  const [ready, setReady] = useState(false)
  const [predictionLabel, setPredictionLabel] = useState('')
  const [predictionConfidence, setPredictionConfidence] = useState('')
  const [predicted, setPredicted] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const loadImage = (event) => {
    const image = event.target.files[0]
    setImageUrl(window.URL.createObjectURL(image))

    console.log(image)
  }


  const classifyImage = async () => {
    const classifier = await ml5.imageClassifier('MobileNet')
    setReady(true)

    const image = document.getElementById("image")

    classifier.predict(image, 5, (err, results) => {
      setPredictionLabel(results[0].label)
      setPredictionConfidence(results[0].confidence)
      setPredicted(true)
    })
  }




  return (
    <main className="App">
      <header>
        <h1>Image Classifier</h1>
      </header>
      <section>
        <div className='input_container'>
          <input type='file' accept='image/*' onChange={loadImage} className='button' />
          <button onClick={classifyImage}>Classify</button>
        </div>
        {
          predicted &&
          <p>The app is {predictionConfidence * 100}% sure that this is {predictionLabel.split(",")[0]} </p>
        }
        {
          imageUrl &&
          <img id='image' src={imageUrl} alt='to be classified' height={500} />



        }

      </section>
    </main>
  );
}

export default App;
