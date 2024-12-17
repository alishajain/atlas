import React from 'react';
import './App.css';
import PanelSelection from './Components/PanelSelection';
import AddSampleDetails from './Components/AddSampleDetails';
import AddKnittingDetailsForm from './Components/AddKnittingDetails';
import ColorMatching from './Components/ColorMatching';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Update for React Router v6

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/add-sample-details" element={<AddSampleDetails />} />
          <Route path="/panel-selection/:RSN" element={<PanelSelection />} />
          <Route path="/add-knitting-details/:RSN" element={<AddKnittingDetailsForm />} />
          <Route path="/" element={<ColorMatching />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
