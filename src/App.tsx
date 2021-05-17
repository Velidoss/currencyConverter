import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Converter from './components/Converter/Converter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <Converter />
      </header>
    </div>
  );
}

export default App;
