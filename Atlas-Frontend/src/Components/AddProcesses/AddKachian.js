import React, { useState, useEffect } from "react";
import { addKachianData } from "../../API/KachianApi";
import { getYarnIds } from "../../API/YarnApi";
import { useSelector } from "react-redux";

const AddKachian = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [yarnIds, setYarnIds] = useState([]);
  const [newKachianData, setNewKachianData] = useState({
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

  const handleAddKachian = async () => {
    try {
      const response = await addKachianData(newKachianData);

      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: Kachian data added successfully!");
      }
    } catch (error) {
      console.error("Error adding kachian data:", error);

      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add kachian data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newKachianData.RSN}
        onChange={(e) =>
          setNewKachianData({ ...newKachianData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newKachianData.EmpID}
        onChange={(e) =>
          setNewKachianData({ ...newKachianData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />

      <select
        value={newKachianData.YarnId}
        onChange={(e) =>
          setNewKachianData({ ...newKachianData, YarnId: e.target.value })
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
        value={newKachianData.Quantity}
        onChange={(e) =>
          setNewKachianData({ ...newKachianData, Quantity: e.target.value })
        }
        placeholder="Quantity"
      />
      <input
        type="number"
        value={newKachianData.Cost}
        onChange={(e) =>
          setNewKachianData({ ...newKachianData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddKachian}>Add Kachian Data</button>
    </div>
  );
};

export default AddKachian;
