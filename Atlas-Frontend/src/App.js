import React from 'react';
import './App.css';
import UpdateSample from './Pages/UpdateSample';
import Signup from './Pages/Signup';
import PanelSelection from './Components/PanelSelection';

// const App = () => {
//   return (
//     <div className="app">
//       <header className="header">
//         <h1>Welcome to the Homepage</h1>
//       </header>
//       <main>
//         <Signup />
//       </main>
//     </div>
//   );
// };

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router components
import AddKnittingDetailsForm from "./Components/AddKnittingDetails"; // Import your form component

function App() {
  return (
    <Router> {/* Wrap everything in a Router */}
      <Routes> 
        <Route path="/" element={<PanelSelection />} /> {/* Home or Panel Selection */}
        <Route path="/add-knitting-details" element={<AddKnittingDetailsForm />} /> {/* The form component */}
      </Routes>
    </Router>
  );
}

export default App;
