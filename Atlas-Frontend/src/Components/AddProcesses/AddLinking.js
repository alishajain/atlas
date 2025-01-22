import React, { useState, useEffect } from "react";
import { addLinkingData } from "../../API/LinkingApi";
import { getYarnIds } from "../../API/YarnApi";
import { useSelector } from "react-redux";

const AddLinking = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [yarnIds, setYarnIds] = useState([]);
  const [newLinkingData, setNewLinkingData] = useState({
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

  const handleAddLinking = async () => {
    try {
      const response = await addLinkingData(newLinkingData);

      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: Linking data added successfully!");
      }
    } catch (error) {
      console.error("Error adding linking data:", error);

      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add linking data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newLinkingData.RSN}
        onChange={(e) =>
          setNewLinkingData({ ...newLinkingData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newLinkingData.EmpID}
        onChange={(e) =>
          setNewLinkingData({ ...newLinkingData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />

      <select
        value={newLinkingData.YarnId}
        onChange={(e) =>
          setNewLinkingData({ ...newLinkingData, YarnId: e.target.value })
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
        value={newLinkingData.Quantity}
        onChange={(e) =>
          setNewLinkingData({ ...newLinkingData, Quantity: e.target.value })
        }
        placeholder="Quantity"
      />
      <input
        type="number"
        value={newLinkingData.Cost}
        onChange={(e) =>
          setNewLinkingData({ ...newLinkingData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddLinking}>Add Linking Data</button>
    </div>
  );
};

export default AddLinking;
