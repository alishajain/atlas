import React, { useState, useEffect } from "react";
import { addSewingData } from "../../API/SewingApi";
import { getYarnIds } from "../../API/YarnApi";
import { useSelector } from "react-redux";

const AddSewing = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [yarnIds, setYarnIds] = useState([]);
  const [newSewingData, setNewSewingData] = useState({
    RSN: RSN,
    EmpID: "",
    YarnId: "",
    Quantity: "",
    Cost: "",
    UserId: userId,
  });

  // Fetch the YarnIds when the component mounts
  useEffect(() => {
    fetchYarnIds();
  }, []);

  const fetchYarnIds = async () => {
    try {
      const response = await getYarnIds();

      if (response && response.data && Array.isArray(response.data)) {
        setYarnIds(response.data);
      } else {
        console.error("Error: YarnIds response is not an array", response);
      }
    } catch (error) {
      console.error("Error fetching YarnIds:", error);
    }
  };

  const handleAddSewing = async () => {
    try {
      const response = await addSewingData(newSewingData);

      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: Sewing data added successfully!");
      }
    } catch (error) {
      console.error("Error adding sewing data:", error);

      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add sewing data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newSewingData.RSN}
        onChange={(e) =>
          setNewSewingData({ ...newSewingData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newSewingData.EmpID}
        onChange={(e) =>
          setNewSewingData({ ...newSewingData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />

      <select
        value={newSewingData.YarnId}
        onChange={(e) =>
          setNewSewingData({ ...newSewingData, YarnId: e.target.value })
        }
      >
        <option value="">Select YarnId</option>
        {yarnIds.map((yarn) => (
          <option key={yarn.YarnId} value={yarn.YarnId}>
            {yarn.YarnId}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={newSewingData.Quantity}
        onChange={(e) =>
          setNewSewingData({ ...newSewingData, Quantity: e.target.value })
        }
        placeholder="Quantity"
      />
      <input
        type="number"
        value={newSewingData.Cost}
        onChange={(e) =>
          setNewSewingData({ ...newSewingData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddSewing}>Add Sewing Data</button>
    </div>
  );
};

export default AddSewing;
