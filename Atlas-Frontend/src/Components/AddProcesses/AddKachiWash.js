import React, { useState } from "react";
import { addKachiWashData } from "../../API/KachiWashApi";
import { useSelector } from "react-redux";

const AddKachiWash = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [newKachiWashData, setNewKachiWashData] = useState({
    RSN: RSN,
    EmpID: "",
    Chemical: "",
    Quantity: "",
    Cost: "",
    UserId: userId,
  });

  const handleAddKachiWash = async () => {
    try {
      const response = await addKachiWashData(newKachiWashData);
      // Check if the response contains a message
      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: Kachi Wash data added successfully!");
      }
    } catch (error) {
      // Log the error to the console to better diagnose issues
      console.error("Error adding kachiwash data:", error);

      // Check if the error has a response with a message
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add kachiwash data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newKachiWashData.RSN}
        onChange={(e) =>
          setNewKachiWashData({ ...newKachiWashData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newKachiWashData.EmpID}
        onChange={(e) =>
          setNewKachiWashData({ ...newKachiWashData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />
      <input
        type="text"
        value={newKachiWashData.Chemical}
        onChange={(e) =>
          setNewKachiWashData({ ...newKachiWashData, Chemical: e.target.value })
        }
        placeholder="Chemical"
      />
      <input
        type="number"
        value={newKachiWashData.Quantity}
        onChange={(e) =>
          setNewKachiWashData({ ...newKachiWashData, Quantity: e.target.value })
        }
        placeholder="Quantity"
      />
      <input
        type="number"
        value={newKachiWashData.Cost}
        onChange={(e) =>
          setNewKachiWashData({ ...newKachiWashData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddKachiWash}>Add Kachi Wash Data</button>
    </div>
  );
};

export default AddKachiWash;
