import React from 'react';
import './App.css';
import AutoComplete from "./components/AutoComplete";

function App() {
  return (
    <div className="App">
      <h2 style={{textAlign: 'center'}}>Countries Autocomplete</h2>
      <AutoComplete />
    </div>
  );
}

export default App;
