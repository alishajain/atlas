import React from 'react';
import './App.css';
import PanelSelection from './Components/PanelSelection';
import AddSampleDetails from './Components/AddSampleDetails';
import AddKnittingDetailsForm from './Components/AddKnittingDetails';
import AddColorMatching from './Components/AddColorMatching';
import AddNewSample from './Components/AddNewSample';
import WelcomeSample from './Pages/WelcomeSample';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Update for React Router v6

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AddSampleDetails />} />
          <Route path="/panel-selection/:RSN" element={<PanelSelection />} />
          <Route path="/add-knitting-details/:RSN" element={<AddKnittingDetailsForm />} />
          <Route path="/add-color-details/:RSN" element={<AddColorMatching />} />
          <Route path='/add-new-sample' element={<AddNewSample />} />
          <Route path='/home-sample' elememt={<WelcomeSample />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
