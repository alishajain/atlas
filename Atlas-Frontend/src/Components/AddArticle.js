import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getColorMatchingByRSN } from "../API/ColorApi";
import { useSelector } from "react-redux";

const AddArticle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.userId);

  // RSN fetched from location state
  const RSN = location.state ? location.state.RSN : null;

  // State for form data
  const [articleNumber, setArticleNumber] = useState("");
  const [sizes, setSizes] = useState({
    freesize: { selected: false, wtvariance: "" },
    xs: { selected: false, wtvariance: "" },
    s: { selected: false, wtvariance: "" },
    m: { selected: false, wtvariance: "" },
    l: { selected: false, wtvariance: "" },
    xl: { selected: false, wtvariance: "" },
    xxl: { selected: false, wtvariance: "" },
    "3xl": { selected: false, wtvariance: "" },
    "4xl": { selected: false, wtvariance: "" },
    "5xl": { selected: false, wtvariance: "" },
  });
  const [selectedColors, setSelectedColors] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch matching colors based on RSN
  useEffect(() => {
    const colors = async () => {
      setLoading(true);
      try {
        const response = await getColorMatchingByRSN(RSN);
        // Filter unique color options based on MatchingName
        const uniqueColors = [
          ...new Map(response.data.map((color) => [color.MatchingName, color])).values(),
        ];
        setColorOptions(uniqueColors);
      } catch (err) {
        setError("Failed to fetch colors.");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      colors();
    }
  }, [RSN]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare form data
    const formData = {
      RSN,
      articleNumber,
      sizes,
      selectedColors,
    };

    console.log("Form data:", formData);

    navigate("/success");
  };

  // Handle checkbox change for sizes
  const handleSizeChange = (e) => {
    const { name, checked } = e.target;
    setSizes((prevSizes) => ({
      ...prevSizes,
      [name]: { ...prevSizes[name], selected: checked },
    }));
  };

  // Handle wtvariance variation input change for sizes
  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    setSizes((prevSizes) => ({
      ...prevSizes,
      [name]: { ...prevSizes[name], wtvariance: value },
    }));
  };

  // Handle checkbox change for selected colors
  const handleColorChange = (e) => {
    const { name, checked } = e.target;
    setSelectedColors((prevColors) =>
      checked
        ? [...prevColors, name]
        : prevColors.filter((color) => color !== name)
    );
  };

  return (
    <div>
      <h1>Add Article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>RSN:</label>
          <input type="text" value={RSN} readOnly />
        </div>

        {/* Article Number Field */}
        <div>
          <label>Article Number:</label>
          <input
            type="text"
            value={articleNumber}
            onChange={(e) => setArticleNumber(e.target.value)}
            required
          />
        </div>

        {/* Sizes Checkboxes with wtvariance Variation */}
        <div>
          <label>Sizes:</label>
          <div>
            {Object.keys(sizes).map((size) => (
              <div key={size}>
                <input
                  type="checkbox"
                  name={size}
                  checked={sizes[size].selected}
                  onChange={handleSizeChange}
                />
                <label>{size.toUpperCase()}</label>
                {sizes[size].selected && (
                  <input
                    type="text"
                    name={`${size}_wtvariance`}
                    value={sizes[size].wtvariance}
                    placeholder="wtvariance Variation Percentage"
                    onChange={handleWeightChange}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Colors Checkboxes */}
        <div>
          <label>Selected Colors:</label>
          <div>
            {colorOptions.map((color) => (
              <div key={color.MatchingName}>
                <input
                  type="checkbox"
                  name={color.MatchingName}
                  onChange={handleColorChange}
                />
                <label>{color.MatchingName}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
