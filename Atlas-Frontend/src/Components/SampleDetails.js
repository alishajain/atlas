import React, { useState, useEffect } from "react";
import axios from "axios";
import WelcomeSample from "../Pages/WelcomeSample";

const SampleDetails = () => {
  const [sampleDetails, setSampleDetails] = useState([]);  // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backButton, setBackButton] = useState(false);


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/SampleDetails")
      .then((response) => {
        if (Array.isArray(response.data.data)) { // Ensure the response is an array
          setSampleDetails(response.data.data);
        } else {
          setError("Invalid data format received.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading Sample Details...</p>;
  }

  if (error) {
    return <p>Error fetching sample details: {error}</p>;
  }

  const handleBackButton = () => {
    setBackButton(true);
  };

  return (
    <div>
      {!backButton && (
    <div>
      <h1>Sample Details</h1>
      <table>
        <thead>
          <tr>
            <th>RSN</th>
            <th>ArticleName</th>
            <th>DesignFileNo</th>
            <th>SeriesArticleFileNo</th>
            <th>ArticleType</th>
            <th>Gender</th>
            <th>MachineSpeed</th>
            <th>Designer</th>
            <th>Grapher</th>
            <th>SampleMaster</th>
            <th>SampleStatus</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(sampleDetails) && sampleDetails.map((sample) => (  // Ensure sampleDetails is an array
            <tr key={sample.RSN}>
              <td>{sample.RSN}</td>
              <td>{sample.ArticleName}</td>
              <td>{sample.DesignFileNo}</td>
              <td>{sample.SeriesArticleFileNo}</td>
              <td>{sample.ArticleType}</td>
              <td>{sample.Gender}</td>
              <td>{sample.MachineSpeed}</td>
              <td>{sample.Designer}</td>
              <td>{sample.Grapher}</td>
              <td>{sample.SampleMaster}</td>
              <td>{sample.SampleStatus}</td>
            </tr>
          ))}
          {!Array.isArray(sampleDetails) && <p>Not an Array</p>}
        </tbody>
      </table>
      <button onClick={handleBackButton}>Go to Welcome Page</button>
    </div>
    )}
    {backButton && <WelcomeSample />}
  </div>
  );
};

export default SampleDetails;
