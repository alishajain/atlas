import React, { useState } from "react";
import { addKachiPressData } from "../../API/KachiPressApi";
import { useSelector } from "react-redux";

const AddKachiPress = ({ RSN }) => {
  const userId = useSelector((state) => state.user.userId);

  const [newKachiPressData, setNewKachiPressData] = useState({
    RSN: RSN,
    EmpID: "",
    Cost: "",
    UserId: userId,
  });

  const handleAddKachiPress = async () => {
    try {
      const response = await addKachiPressData(newKachiPressData);
      console.log(response); // Check response here

      // Check if the response contains a message
      if (response && response.message) {
        alert(`Success: ${response.message}`);
      } else {
        alert("Success: KachiPress data added successfully!");
      }
    } catch (error) {
      // Log the error to the console to better diagnose issues
      console.error("Error adding kachipress data:", error);

      // Check if the error has a response with a message
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to add kachipress data.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newKachiPressData.RSN}
        onChange={(e) =>
          setNewKachiPressData({ ...newKachiPressData, RSN: e.target.value })
        }
        placeholder="RSN"
      />
      <input
        type="text"
        value={newKachiPressData.EmpID}
        onChange={(e) =>
          setNewKachiPressData({ ...newKachiPressData, EmpID: e.target.value })
        }
        placeholder="EmpID"
      />
      <input
        type="number"
        value={newKachiPressData.Cost}
        onChange={(e) =>
          setNewKachiPressData({ ...newKachiPressData, Cost: e.target.value })
        }
        placeholder="Cost"
      />
      <button onClick={handleAddKachiPress}>Add KachiPress Data</button>
    </div>
  );
};

export default AddKachiPress;
