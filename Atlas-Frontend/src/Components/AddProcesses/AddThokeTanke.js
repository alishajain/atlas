import React, { useState, useEffect } from "react";
import { addThokeTankeData } from "../../API/ThokeTankeApi";
import { getYarnIds } from "../../API/YarnApi";
import { useSelector } from "react-redux";

const AddThokeTanke = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [yarnIds, setYarnIds] = useState([]);
  const [newThokeTankeData, setNewThokeTankeData] = useState({
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

  const handleAddThokeTanke = async () => {
    try {
      const response = await addThokeTankeData(newThokeTankeData);

      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: ThokeTanke data added successfully!");
      }
    } catch (error) {
      console.error("Error adding thoketanke data:", error);

      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add thoketanke data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newThokeTankeData.RSN}
        onChange={(e) =>
          setNewThokeTankeData({ ...newThokeTankeData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newThokeTankeData.EmpID}
        onChange={(e) =>
          setNewThokeTankeData({ ...newThokeTankeData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />

      <select
        value={newThokeTankeData.YarnId}
        onChange={(e) =>
          setNewThokeTankeData({ ...newThokeTankeData, YarnId: e.target.value })
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
        value={newThokeTankeData.Quantity}
        onChange={(e) =>
          setNewThokeTankeData({ ...newThokeTankeData, Quantity: e.target.value })
        }
        placeholder="Quantity"
      />
      <input
        type="number"
        value={newThokeTankeData.Cost}
        onChange={(e) =>
          setNewThokeTankeData({ ...newThokeTankeData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddThokeTanke}>Add ThokeTanke Data</button>
    </div>
  );
};

export default AddThokeTanke;
