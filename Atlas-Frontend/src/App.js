import React from 'react';
import './App.css';
import PanelSelection from './Components/PanelSelection';
import AddSampleDetails from './Components/AddSampleDetails';
import AddKnittingDetailsForm from './Components/AddKnittingDetails';
import ColorMatchingForm from './Components/ColorMatchingForm';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Update for React Router v6

function App() {
  return (
    <Router>
      <div>
        {/* Set up the routing for your app */}
        <Routes>
          {/* Route for Add Sample Details Page */}
          <Route path="/" element={<AddSampleDetails />} />

          {/* Route for Panel Selection Page */}
          <Route path="/panel-selection/:RSN" element={<PanelSelection />} />

          {/* Route for Add Knitting Details Page */}
          <Route path="/add-knitting-details/:RSN" element={<AddKnittingDetailsForm />} />

          <Route path="/add-color-details/:RSN" element={<ColorMatchingForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
