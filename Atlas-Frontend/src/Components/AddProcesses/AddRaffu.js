import React, { useState, useEffect } from "react";
import { addRaffuData } from "../../API/RaffuApi";
import { getYarnIds } from "../../API/YarnApi";
import { useSelector } from "react-redux";

const AddRaffu = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [yarnIds, setYarnIds] = useState([]);
  const [newRaffuData, setNewRaffuData] = useState({
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

  const handleAddRaffu = async () => {
    try {
      const response = await addRaffuData(newRaffuData);

      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: Raffu data added successfully!");
      }
    } catch (error) {
      console.error("Error adding raffu data:", error);

      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add raffu data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newRaffuData.RSN}
        onChange={(e) =>
          setNewRaffuData({ ...newRaffuData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newRaffuData.EmpID}
        onChange={(e) =>
          setNewRaffuData({ ...newRaffuData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />

      <select
        value={newRaffuData.YarnId}
        onChange={(e) =>
          setNewRaffuData({ ...newRaffuData, YarnId: e.target.value })
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
        value={newRaffuData.Quantity}
        onChange={(e) =>
          setNewRaffuData({ ...newRaffuData, Quantity: e.target.value })
        }
        placeholder="Quantity"
      />
      <input
        type="number"
        value={newRaffuData.Cost}
        onChange={(e) =>
          setNewRaffuData({ ...newRaffuData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddRaffu}>Add Raffu Data</button>
    </div>
  );
};

export default AddRaffu;
