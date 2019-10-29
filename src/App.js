import React from 'react';
import './App.scss';

import Headers from './Components/Header/Header';
import Restaurant from './Containers/Restaurant/Restaurant';

const App = () => {
  return (
    <div className="App">
      <Headers />
      <Restaurant />
    </div>
  );
};

export default App;
