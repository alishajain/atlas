import React from 'react';
import './App.css';
import PanelSelection from './Components/PanelSelection';
import AddSampleDetails from './Components/AddSampleDetails';
import AddKnittingDetailsForm from './Components/AddKnittingDetails';
import AddColorMatching from './Components/AddColorMatching';
import WelcomeSample from './Pages/WelcomeSample';
import AddSample from './Pages/AddSample';
import ShowColor from './Components/ShowColor';
//import UpdateSample from './Pages/UpdateSample';
import RSNInput from './Components/RSNInput';
import ShowSamples from './Pages/ShowSamples';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Update for React Router v6

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<WelcomeSample />} />

          {/* Routes for adding sample details */}
          <Route path='/add-sample' element={<AddSample />} />
          <Route path="/add-sample-details" element={<AddSampleDetails />} />
          <Route path="/panel-selection/:RSN" element={<PanelSelection />} />
          <Route path="/add-knitting-details/:RSN" element={<AddKnittingDetailsForm />} />
          <Route path="/add-color-details/:RSN" element={<AddColorMatching />} />

          {/* Routes for displaying sample data */}
          <Route path="/get-RSN" element={<RSNInput />} />
          <Route path="/show-sample/:RSN" element={<ShowSamples />} />
          <Route path='/show-color/:RSN' element={<ShowColor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
