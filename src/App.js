import React, { useState } from 'react';
import NewAdhaarFormReg from './Components/NewAdhaarFormReg';
import RegisteredUserDetails from './Components/RegisteredUserDetails';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState('newRegister');
  return (
    <div className="App">
      <div className="tab-container">
        <button 
          className={`tab ${currentTab === 'newRegister' ? 'active' : ''}`} 
          onClick={() => setCurrentTab('newRegister')}
        >
          New Register
        </button>
        <button 
          className={`tab ${currentTab === 'registeredUser' ? 'active' : ''}`} 
          onClick={() => setCurrentTab('registeredUser')}
        >
          Registered User
        </button>
      </div>
      <div className="tab-content">
        {currentTab === 'newRegister' && <NewAdhaarFormReg />}
        {currentTab === 'registeredUser' && <RegisteredUserDetails/>}
      </div>
    </div>
  );
}

export default App;
