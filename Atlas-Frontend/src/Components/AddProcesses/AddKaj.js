import React, { useState, useEffect } from "react";
import { addKajData } from "../../API/KajApi";
import { getYarnIds } from "../../API/YarnApi";
import { useSelector } from "react-redux";

const AddKaj = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [yarnIds, setYarnIds] = useState([]);
  const [newKajData, setNewKajData] = useState({
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

  const handleAddKaj = async () => {
    try {
      const response = await addKajData(newKajData);

      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: Kaj data added successfully!");
      }
    } catch (error) {
      console.error("Error adding kaj data:", error);

      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add kaj data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newKajData.RSN}
        onChange={(e) =>
          setNewKajData({ ...newKajData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newKajData.EmpID}
        onChange={(e) =>
          setNewKajData({ ...newKajData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />

      <select
        value={newKajData.YarnId}
        onChange={(e) =>
          setNewKajData({ ...newKajData, YarnId: e.target.value })
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
        value={newKajData.Quantity}
        onChange={(e) =>
          setNewKajData({ ...newKajData, Quantity: e.target.value })
        }
        placeholder="Quantity"
      />
      <input
        type="number"
        value={newKajData.Cost}
        onChange={(e) =>
          setNewKajData({ ...newKajData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddKaj}>Add Kaj Data</button>
    </div>
  );
};

export default AddKaj;
