import "../../styles/Searchbar.css";
import React, { useState } from "react";

const Searchbar = ({
  allCourses,
  coursesToShow,
  setCoursesToShow,
  setSelectedCourse,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setQuery(inputValue);
  
    if (inputValue.length >= 1) {
      const filteredSuggestions = allCourses.filter(
        (item) =>
          item.name.toLowerCase().startsWith(inputValue) ||
          item.tags.some((tag) => tag.toLowerCase().startsWith(inputValue)) ||
          item.departments.some((department) =>
            department.toLowerCase().startsWith(inputValue)
          )
      );
  
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  

  const handleButtonClick = () => {
    setCoursesToShow(suggestions);
  };

  return (
    <div className="header">
      <div className="search-bar-logo">KATALOG KURSEVA</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Претражите курсеве по називу, тагу, називу катедре..."
          value={query}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li onClick={() => setSelectedCourse(suggestion)} key={index}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="submit-button">
        <button onClick={handleButtonClick} type="submit">
          Претражи
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
