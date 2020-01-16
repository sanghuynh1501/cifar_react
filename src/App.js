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
    base64_string = base64_string.replace('data:image/jpeg;base64','').replace('data:image/png;base64','')
    var buffer = Buffer.from(base64_string, 'base64')
    const image = cv.imdecode(buffer);
    console.log("image", image)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
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
