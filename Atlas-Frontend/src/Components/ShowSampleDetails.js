import React, { useState, useEffect } from "react";
import { getSampleDetailsByRSN } from "../API/SampleApi";

const ShowSampleDetails = ({ RSN }) => {
  const [sampleDetails, setSampleDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch data when RSN changes
  useEffect(() => {
    if (RSN) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await getSampleDetailsByRSN(RSN);
          setSampleDetails(response.data); // Assuming the response has a "data" field
        } catch (err) {
          setError("Failed to fetch sample details.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [RSN]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {sampleDetails && (
        <table border="1" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>RSN</th>
              <th>Article Name</th>
              <th>Design File No</th>
              <th>Series Article File No</th>
              <th>Article Type</th>
              <th>Gender</th>
              <th>Machine Speed</th>
              <th>Designer</th>
              <th>Grapher</th>
              <th>Sample Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{sampleDetails.RSN}</td>
              <td>{sampleDetails.ArticleName}</td>
              <td>{sampleDetails.DesignFileNo}</td>
              <td>{sampleDetails.SeriesArticleFileNo}</td>
              <td>{sampleDetails.ArticleType}</td>
              <td>{sampleDetails.Gender}</td>
              <td>{sampleDetails.MachineSpeed}</td>
              <td>{sampleDetails.Designer}</td>
              <td>{sampleDetails.Grapher}</td>
              <td>{sampleDetails.SampleStatus}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowSampleDetails;
