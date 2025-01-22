import React, { useState } from "react";
import { addCuttingData } from "../../API/CuttingApi";
import { useSelector } from "react-redux";

const AddCutting = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [newCuttingData, setNewCuttingData] = useState({
    RSN: RSN,
    EmpID: "",
    Cost: "",
    UserId: userId,
  });

  const handleAddCutting = async () => {
    try {
      const response = await addCuttingData(newCuttingData);
      console.log(response); // Check response here

      // Check if the response contains a message
      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: Cutting data added successfully!");
      }
    } catch (error) {
      // Log the error to the console to better diagnose issues
      console.error("Error adding cutting data:", error);

      // Check if the error has a response with a message
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add cutting data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newCuttingData.RSN}
        onChange={(e) =>
          setNewCuttingData({ ...newCuttingData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newCuttingData.EmpID}
        onChange={(e) =>
          setNewCuttingData({ ...newCuttingData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />
      <input
        type="number"
        value={newCuttingData.Cost}
        onChange={(e) =>
          setNewCuttingData({ ...newCuttingData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddCutting}>Add Cutting Data</button>
    </div>
  );
};

export default AddCutting;
