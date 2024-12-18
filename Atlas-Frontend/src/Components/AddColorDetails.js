import React, { useState, useEffect } from "react";
import { addColorDetail } from "../API/ColorDetailApi"; 

const AddColorDetails = ({ matchingName, RSN, selectedStates }) => {
  const initialState = {
    ColorId: "",
    BaseColor: { name: null, weight: 0 },
    colors: Array(14).fill({ name: null, weight: 0 }), 
    totalWeight: 0,
  };

  // Initialize the formData based on the selectedStates with true values
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Dynamically create formData based on selectedStates with value true
    const selectedPanels = Object.entries(selectedStates)
      .filter(([_, value]) => value === true)
      .map(([key]) => key);

    // Update the formData to have one entry per selected panel
    setFormData(
      selectedPanels.map((panelName) => ({
        ...initialState,
        ColorId: panelName, // Set the panel name as ColorId
      }))
    );
  }, [selectedStates]);

  // Handle change for input fields (ColorId, BaseColor Name/Weight, and each Color Name/Weight)
  const handleInputChange = (e, index, field, colorIndex = null) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];

    if (field === "colors" && colorIndex !== null) {
      // Update the specific color field (either name or weight)
      updatedFormData[index].colors[colorIndex][name] = value;
    } else if (field === "BaseColor") {
      updatedFormData[index].BaseColor[name] = value;
    } else {
      updatedFormData[index][name] = value;
    }

    // Recalculate total weight whenever a weight field is changed
    updatedFormData[index].totalWeight = updatedFormData[index].colors.reduce(
      (sum, color) => sum + (parseFloat(color.weight) || 0), 0
    );

    // Recalculate total weight for BaseColor
    updatedFormData[index].totalWeight += (parseFloat(updatedFormData[index].BaseColor.weight) || 0);

    setFormData(updatedFormData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data in the expected format
    const colorData = formData.map((row) => {
      const colors = row.colors.reduce((acc, color, index) => {
        acc[`Color${index + 1}`] = { name: color.name, weight: color.weight };
        return acc;
      }, {});

      return {
        ColorId: row.ColorId,
        BaseColor: row.BaseColor,
        totalWeight: row.totalWeight,
        ...colors,
      };
    });

    try {
      // Send the data to the backend via the addColorDetail API call from ColordetailsApi.js
      const response = await Promise.all(
        colorData.map((data) => addColorDetail(data))
      );
      console.log(response); // Log the successful response
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h3>{matchingName}</h3> {/* Display the matching name as a heading */}
      <form onSubmit={handleSubmit}>
        <table border="1" style={{ width: "100%", tableLayout: "auto" }}>
          <thead>
            <tr>
              <th style={{ width: "4%" }}>Panel</th>
              <th style={{ width: "4%" }}>Base Color</th>
              {[...Array(14)].map((_, index) => (
                <th key={index} style={{ width: "6%" }}>
                  Color {index + 1}
                </th>
              ))}
              <th rowSpan="2" style={{ width: "4%" }}>
                Total Weight
              </th>
            </tr>
          </thead>
          <tbody>
            {formData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* Panel Column - display the selected panel name instead of ColorId */}
                <td>{row.ColorId}</td>

                {/* Base Color */}
                <td>
                  <input
                    type="text"
                    name="name"
                    value={row.BaseColor.name || ""}
                    placeholder="Base Color Name"
                    onChange={(e) => handleInputChange(e, rowIndex, "BaseColor")}
                  />
                  <input
                    type="number"
                    name="weight"
                    value={row.BaseColor.weight || 0}
                    placeholder="Base Color Weight"
                    onChange={(e) => handleInputChange(e, rowIndex, "BaseColor")}
                  />
                </td>

                {/* Color columns */}
                {row.colors.map((color, colorIndex) => (
                  <React.Fragment key={colorIndex}>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={color.name || ""}
                        placeholder={`Color ${colorIndex + 1} Name`}
                        onChange={(e) => handleInputChange(e, rowIndex, "colors", colorIndex)}
                      />
                      <input
                        type="number"
                        name="weight"
                        value={color.weight || 0}
                        placeholder={`Color ${colorIndex + 1} Weight`}
                        onChange={(e) => handleInputChange(e, rowIndex, "colors", colorIndex)}
                      />
                    </td>
                  </React.Fragment>
                ))}

                {/* Total Weight */}
                <td>
                  <input
                    type="number"
                    name="totalWeight"
                    value={row.totalWeight}
                    readOnly
                    style={{ backgroundColor: "#f0f0f0" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddColorDetails;
