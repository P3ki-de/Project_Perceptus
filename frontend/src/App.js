import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Okno } from './components/widoki/oknoglowne/Okno';
import { Login } from './components/widoki/login/Login';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <Okno onToggleLogin={() => setShowLogin(v => !v)} />
      <Login visible={showLogin} />
    </div>
  );
}

export default App;
