import React from "react";
import "./App.css";
import PanelSelection from "./Components/PanelSelection";
import AddSampleDetails from "./Components/AddSampleDetails";
import AddKnittingDetailsForm from "./Components/AddKnittingDetails";
import AddColorMatching from "./Components/AddColorMatching";
import WelcomeSample from "./Pages/WelcomeSample";
import AddSample from "./Pages/AddSample";
import ShowColor from "./Components/ShowColor";
import SampleActions from "./Pages/SampleActions";
import RSNInput from "./Components/RSNInput";
import ShowSamples from "./Pages/ShowSamples";
import DeleteSample from "./Pages/DeleteSample";
import UpdateSampleDetails from "./Components/UpdateSampleDetails";
import UpdateKnittingDetails from "./Components/UpdateKnittingDetails";
import AddYarnDetails from "./Components/AddYarnDetails";
import AddYarnStockDetails from "./Components/AddYarnStockDetails";
import YarnDetails from "./Components/YarnDetails";
import YarnStockDetails from "./Components/YarnStockDetails";
import SearchEmployee from "./Components/SearchEmployee";
import AddEmployeeDetails from "./Components/AddEmployeeDetails";
import Employee from "./Pages/Employee";
import Login from "./Components/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Yarn from "./Pages/Yarn";
import AddImage from "./Components/AddImage";
import Machine from './Pages/Machine';
import AddMachine from "./Components/AddMachine";
import MachineDetails from "./Components/MachineDetails";
import SearchMachine from "./Components/SearchMachine";
import SearchYarn from "./Components/SearchYarn";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for signin page */}
          <Route path="/" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/home" element={<Home />} />

          <Route path="/sample" element={<WelcomeSample />} />

          {/* Routes for adding sample details */}
          <Route path="/add-sample" element={<AddSample />} />
          <Route path="/add-sample-details" element={<AddSampleDetails />} />
          <Route path="/add-image/:RSN" element={<AddImage />} />
          <Route path="/panel-selection/:RSN" element={<PanelSelection />} />
          <Route
            path="/add-knitting-details/:RSN"
            element={<AddKnittingDetailsForm />}
          />
          <Route
            path="/add-color-details/:RSN"
            element={<AddColorMatching />}
          />

          {/* Routes for displaying sample data */}
          <Route path="/get-RSN" element={<RSNInput />} />
          <Route path="/show-sample/:RSN" element={<ShowSamples />} />
          <Route path="/show-color/:RSN" element={<ShowColor />} />

          {/* Routes for further sample actions */}
          <Route path="/sample-actions/:RSN" element={<SampleActions />} />
          <Route path="/delete-sample/:RSN" element={<DeleteSample />} />
          <Route path="/update-sample/:RSN" element={<UpdateSampleDetails />} />
          <Route
            path="/update-knitting/:RSN"
            element={<UpdateKnittingDetails />}
          />

          {/* Routes for Yarn Management */}
          <Route path="/yarn" element={<Yarn />} />
          <Route path="/add-yarn" element={<AddYarnDetails />} />
          <Route path="/show-yarn" element={<YarnDetails />} />
          <Route path="/add-yarn-stock" element={<AddYarnStockDetails />} />
          <Route path="/yarn-stock" element={<YarnStockDetails />} />

          {/* Routes for Employee Management */}
          <Route path="/employee" element={<Employee />} />
          <Route path="/add-employee" element={<AddEmployeeDetails />} />
          <Route path="/search-employee" element={<SearchEmployee />} />

          {/* Routes for Machine mnagement */}
          <Route path="/machine" element={<Machine />} />
          <Route path="/add-machine" element={<AddMachine />} />
          <Route path="/show-machine" element={<MachineDetails />} />
          <Route path="/search-machine" element={<SearchMachine />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
