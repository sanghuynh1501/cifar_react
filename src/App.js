import React, {useCallback} from 'react'
import { useDropzone } from 'react-dropzone'

import './App.css'

function Dropzone() {

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

  const onDrop = useCallback(async acceptedFiles => {
    let base64_string = await toBase64(acceptedFiles[0])
    document.getElementById('predict_image')
    .setAttribute(
        'src', base64_string
    )
    document.getElementById('predict_button').style.display = "inline"
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/png', 'image/jpeg']
  })

  return (
    <>
      <div id="predict_label" style={{color: 'white', marginBottom: 10}}>
        No label
      </div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          <img style={{height: 300, width: 300}} id="predict_image" src="default-image.jpg" alt="" />
        }
      </div>
      {
        <button 
          id="predict_button"
          style={{ display: 'none', marginTop: 10 }}
          onClick={() => {
            console.log('window.go ', window.go)
            WebAssembly.instantiateStreaming(fetch("main.wasm"), window.go.importObject).then((result) => {
              window.go.run(result.instance);
            })
          }}
        >
          Predict
        </button>
      }
    </>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dropzone />
      </header>
    </div>
  );
}

export default App;
