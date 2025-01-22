import React, { useState, useEffect } from "react";
import { addTailoringData } from "../../API/TailoringApi";
import { getYarnIds } from "../../API/YarnApi";
import { useSelector } from "react-redux";

const AddTailoring = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [yarnIds, setYarnIds] = useState([]);
  const [newTailoringData, setNewTailoringData] = useState({
    RSN: RSN,
    EmpID: "",
    YarnId: "",
    Quantity: "",
    Cost: "",
    UserId: 'admin',
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

  const handleAddTailoring = async () => {
    try {
      const response = await addTailoringData(newTailoringData);

      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: Tailoring data added successfully!");
      }
    } catch (error) {
      console.error("Error adding tailoring data:", error);

      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add tailoring data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTailoringData.RSN}
        onChange={(e) =>
          setNewTailoringData({ ...newTailoringData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newTailoringData.EmpID}
        onChange={(e) =>
          setNewTailoringData({ ...newTailoringData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />

      <select
        value={newTailoringData.YarnId}
        onChange={(e) =>
          setNewTailoringData({ ...newTailoringData, YarnId: e.target.value })
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
        value={newTailoringData.Quantity}
        onChange={(e) =>
          setNewTailoringData({ ...newTailoringData, Quantity: e.target.value })
        }
        placeholder="Quantity"
      />
      <input
        type="number"
        value={newTailoringData.Cost}
        onChange={(e) =>
          setNewTailoringData({ ...newTailoringData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddTailoring}>Add Tailoring Data</button>
    </div>
  );
};

export default AddTailoring;
