import React, { useState } from "react";
import { addPakkiWashData } from "../../API/PakkiWashApi";
import { useSelector } from "react-redux";

const AddPakkiWash = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [newPakkiWashData, setNewPakkiWashData] = useState({
    RSN: RSN,
    EmpID: "",
    Chemical: "",
    Quantity: "",
    Cost: "",
    UserId: userId,
  });

  const handleAddPakkiWash = async () => {
    try {
      const response = await addPakkiWashData(newPakkiWashData);
      // Check if the response contains a message
      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: Pakki Wash data added successfully!");
      }
    } catch (error) {
      // Log the error to the console to better diagnose issues
      console.error("Error adding pakkiwash data:", error);

      // Check if the error has a response with a message
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add pakkiwash data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newPakkiWashData.RSN}
        onChange={(e) =>
          setNewPakkiWashData({ ...newPakkiWashData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newPakkiWashData.EmpID}
        onChange={(e) =>
          setNewPakkiWashData({ ...newPakkiWashData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />
      <input
        type="text"
        value={newPakkiWashData.Chemical}
        onChange={(e) =>
          setNewPakkiWashData({ ...newPakkiWashData, Chemical: e.target.value })
        }
        placeholder="Chemical"
      />
      <input
        type="number"
        value={newPakkiWashData.Quantity}
        onChange={(e) =>
          setNewPakkiWashData({ ...newPakkiWashData, Quantity: e.target.value })
        }
        placeholder="Quantity"
      />
      <input
        type="number"
        value={newPakkiWashData.Cost}
        onChange={(e) =>
          setNewPakkiWashData({ ...newPakkiWashData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddPakkiWash}>Add Pakki Wash Data</button>
    </div>
  );
};

export default AddPakkiWash;
