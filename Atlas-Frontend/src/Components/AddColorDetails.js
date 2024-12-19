import React, { useState, useEffect } from "react";
import { addColorDetail } from "../API/ColorDetailApi";
import { getColorId } from "../API/ColorApi";

const AddColorDetails = ({ matchingName, RSN, size, selectedStates }) => {
  // Initial state for a row in the table
  const initialRowState = {
    ColorId: "",
    Size: size,
    BaseColor: { Name: "", Weight: "" },
    colors: Array(14).fill({ Name: "", Weight: "" }), // Initialize colors array with 14 colors
  };

  // State for form data (this will be an array of rows)
  const [formData, setFormData] = useState([]);

  // State to store ColorIds fetched from the API
  const [colorIds, setColorIds] = useState({});

  // State to handle success and error messages
  const [message, setMessage] = useState({ type: "", content: "" });

  // Extract selected panels from selectedStates
  const selectedPanels = Object.entries(selectedStates)
    .filter(([_, value]) => value === true)
    .map(([key]) => key);

  // Set initial formData when selectedStates change
  useEffect(() => {
    setFormData(
      selectedPanels.map((panelName) => ({
        ...initialRowState,
        ColorId: panelName, // Assign the panel name to ColorId
      }))
    );
  }, [selectedStates]);

  // Fetch ColorId for each selected panel
  const fetchColorId = async () => {
    try {
      const newColorIds = {};

      for (const Panel of selectedPanels) {
        const data = await getColorId(RSN, matchingName, Panel);
        newColorIds[Panel] = data.ColorId; // Use only Panel as the key
      }

      // Update formData with the fetched ColorIds
      setFormData((prevFormData) =>
        prevFormData.map((row) => ({
          ...row,
          ColorId: newColorIds[row.ColorId] || row.ColorId,
        }))
      );
      setColorIds(newColorIds); // Store all ColorIds in state
    } catch (error) {
      console.error("Error fetching ColorId:", error);
      setMessage({ type: "error", content: "Error fetching ColorIds." });
    }
  };

  // Handle input changes (BaseColor, Color1, Color2, etc.)
  const handleInputChange = (e, rowIndex, field, colorIndex = null) => {
    const { name, value } = e.target;

    // Create a new array by mapping over formData
    const updatedFormData = formData.map((row, index) => {
      if (index === rowIndex) {
        // Only update the row that was modified
        const updatedRow = { ...row };

        if (field === "colors" && colorIndex !== null) {
          // Update specific color field (either name or weight)
          updatedRow.colors = updatedRow.colors.map((color, idx) =>
            idx === colorIndex
              ? { ...color, [name]: value } // Update the color field (Name or Weight)
              : color
          );
        } else if (field === "BaseColor") {
          updatedRow.BaseColor = {
            ...updatedRow.BaseColor, // Copy BaseColor object
            [name]: value, // Update BaseColor field (name or weight)
          };
        } else {
          updatedRow[name] = value; // Update other fields like ColorId, Size
        }

        return updatedRow; // Return the updated row
      }
      return row; // For other rows, return the original unchanged row
    });

    // Update formData with the modified array
    setFormData(updatedFormData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const colorData = formData.map((row) => {
      const colors = row.colors.reduce((acc, color, index) => {
        acc[`Color${index + 1}`] = { Name: color.Name, Weight: color.Weight };
        return acc;
      }, {});

      return {
        ColorId: row.ColorId,
        Size: row.Size,
        BaseColor: row.BaseColor,
        ...colors,
      };
    });

    try {
      // Send the data to the backend via the addColorDetail API, making separate API calls for each row
      const responses = await Promise.all(
        colorData.map((data) => addColorDetail(data))
      );
      setMessage({ type: "success", content: "Data submitted successfully!" });
      console.log(responses); // Log the successful responses for all panels
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage({ type: "error", content: "Error submitting the form." });
    }
  };

  return (
    <div>
      <button onClick={fetchColorId}>Fetch ColorIds</button>
      <h3>{matchingName}</h3>

      {/* Show success/error message */}
      {message.content && (
        <div
          style={{
            color: message.type === "error" ? "red" : "green",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          {message.content}
        </div>
      )}

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
                <td>{row.ColorId}</td>

                {/* Base Color */}
                <td>
                  <input
                    type="text"
                    name="Name"
                    value={row.BaseColor.Name || ""}
                    placeholder="Base Color Name"
                    onChange={(e) => handleInputChange(e, rowIndex, "BaseColor")}
                  />
                  <input
                    type="number"
                    name="Weight"
                    value={row.BaseColor.Weight || ""}
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
                        name="Name"
                        value={color.Name || ""}
                        placeholder={`Color ${colorIndex + 1} Name`}
                        onChange={(e) =>
                          handleInputChange(e, rowIndex, "colors", colorIndex)
                        }
                      />
                      <input
                        type="number"
                        name="Weight"
                        value={color.Weight || ""}
                        placeholder={`Color ${colorIndex + 1} Weight`}
                        onChange={(e) =>
                          handleInputChange(e, rowIndex, "colors", colorIndex)
                        }
                      />
                    </td>
                  </React.Fragment>
                ))}

                {/* Total Weight */}
                <td>
                  <input
                    type="number"
                    name="totalWeight"
                    value={row.totalWeight || ""}
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
