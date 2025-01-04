import React, { useState, useEffect } from "react";
import axios from "axios";

const SampleDetails = () => {
  const [sampleDetails, setSampleDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/SampleDetails`)
      .then((response) => {
        if (Array.isArray(response.data.data)) { 
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

  return (
    <div>
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
    </div>
  </div>
  );
};

export default SampleDetails;
