import React from 'react';

import logo from 'src/assets/logo.svg';
import './index.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <p>
          There gonna be an awesome table built on React and TypeScript here
        </p>
      </header>
    </div>
  );
}

export default App;
