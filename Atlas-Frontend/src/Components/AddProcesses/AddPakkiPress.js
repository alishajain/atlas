import React, { useState } from "react";
import { addPakkiPressData } from "../../API/PakkiPressApi";
import { useSelector } from "react-redux";

const AddPakkiPress = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [newPakkiPressData, setNewPakkiPressData] = useState({
    RSN: RSN,
    EmpID: "",
    Cost: "",
    UserId: userId,
  });

  const handleAddPakkiPress = async () => {
    try {
      const response = await addPakkiPressData(newPakkiPressData);
      console.log(response); // Check response here

      // Check if the response contains a message
      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: PakkiPress data added successfully!");
      }
    } catch (error) {
      // Log the error to the console to better diagnose issues
      console.error("Error adding pakkipress data:", error);

      // Check if the error has a response with a message
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add pakkipress data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newPakkiPressData.RSN}
        onChange={(e) =>
          setNewPakkiPressData({ ...newPakkiPressData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newPakkiPressData.EmpID}
        onChange={(e) =>
          setNewPakkiPressData({ ...newPakkiPressData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />
      <input
        type="number"
        value={newPakkiPressData.Cost}
        onChange={(e) =>
          setNewPakkiPressData({ ...newPakkiPressData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddPakkiPress}>Add PakkiPress Data</button>
    </div>
  );
};

export default AddPakkiPress;
