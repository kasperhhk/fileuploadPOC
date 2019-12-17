import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FileUpload></FileUpload>
      </header>
    </div>
  );
}

export default App;
