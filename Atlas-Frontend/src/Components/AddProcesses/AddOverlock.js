import React, { useState, useEffect } from "react";
import { addOverlockData } from "../../API/OverlockApi";
import { getYarnIds } from "../../API/YarnApi";
import { useSelector } from "react-redux";

const AddOverlock = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [yarnIds, setYarnIds] = useState([]);
  const [newOverlockData, setNewOverlockData] = useState({
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

  const handleAddOverlock = async () => {
    try {
      const response = await addOverlockData(newOverlockData);

      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: Overlock data added successfully!");
      }
    } catch (error) {
      console.error("Error adding overlock data:", error);

      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add overlock data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newOverlockData.RSN}
        onChange={(e) =>
          setNewOverlockData({ ...newOverlockData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newOverlockData.EmpID}
        onChange={(e) =>
          setNewOverlockData({ ...newOverlockData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />

      <select
        value={newOverlockData.YarnId}
        onChange={(e) =>
          setNewOverlockData({ ...newOverlockData, YarnId: e.target.value })
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
        value={newOverlockData.Quantity}
        onChange={(e) =>
          setNewOverlockData({ ...newOverlockData, Quantity: e.target.value })
        }
        placeholder="Quantity"
      />
      <input
        type="number"
        value={newOverlockData.Cost}
        onChange={(e) =>
          setNewOverlockData({ ...newOverlockData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddOverlock}>Add Overlock Data</button>
    </div>
  );
};

export default AddOverlock;
