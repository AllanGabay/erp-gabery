import React, { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import UserDropdown from "./components/UserDropdown";
import "./App.css";
import { getSheetData } from "./components/SheetService";
import MenuPanel from './components/MenuPanel';
import GoogleLoginPage from "./components/GoogleLoginPage";


function App() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleLoginSuccess = (response) => {
    const token = response.credential;
    localStorage.setItem("googleAccessToken", token);

    // Stockez d'autres informations nécessaires, comme l'ID utilisateur, le nom, etc.
    localStorage.setItem("googleUserId", response.sub);
    localStorage.setItem("googleUserName", response.name);
  };

  const handleMouseEnter = (index) => {
    setExpandedIndex(index);
  };

  const handleMouseLeave = () => {
    setExpandedIndex(null);
  };

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  const filterData = (item) => {
    if (!searchText) {
      return true;
    }
  
    const searchTerms = searchText.toLowerCase().split(" ");
  
    const searchInValue = (value, term) => {
      if (Array.isArray(value)) {
        return value.some((subValue) => searchInValue(subValue, term));
      } else if (typeof value === "object" && value !== null) {
        return Object.values(value).some((subValue) => searchInValue(subValue, term));
      } else {
        return String(value).toLowerCase().includes(term);
      }
    };
  
    return searchTerms.every((term) =>
      Object.values(item).some((value) => searchInValue(value, term))
    );
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      const { categories, data } = await getSheetData();
      console.log("Categories:", categories);
      console.log("Data:", data);
      setData(data);
      setCategories(categories);
    };

    fetchData();
  }, []);

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((subValue, subIndex) => (
        <div key={subIndex} className="sub-category">
          {formatValue(subValue)}
        </div>
      ));
    } else if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${val}`)
        .join(", ");
    } else {
      return value;
    }
  };

  const renderAdditionalData = (item) => {
    return categories.map((category, catIndex) => (
      <div key={catIndex} className="additional-data-item">
        <strong>{category}:</strong>
        {category === "Modification user" ? (
          <UserDropdown modifications={item["Modification user"]} />
        ) : (
          formatValue(item[category])
        )}
      </div>
    ));
  };

  return (
    <div className="App">
<GoogleLoginPage onLoginSuccess={(response) => handleLoginSuccess(response)} />

      <TopBar onSearch={handleSearch} />
      <div style={{ display: 'flex' }}>
        <MenuPanel />
        <div className="data-grid">
        {data
          .filter(filterData)
          .map((item, index) => (
            <div
              key={index}
              className="data-item"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div>
                <span className="client">{item.Client}</span>
                <span className="collection" style={{ float: "right" }}>
                  <div className="collection-value">
                    {item.Collection.name} {}
                  </div>
                  <div className="collection-alias">
                    {item.Collection.alias}
                  </div>
                </span>
              </div>
              <div>
                <span className="typology">
                  {item.Typologie} {}
                  <span className="designation-value">
                    {item.Désignation}
                  </span>
                </span>
              </div>
              <div className="additional-data">
                {renderAdditionalData(item)}
              </div>
              <div>
              <span className="state">{item.Etat}</span>
                <span className="of-gabery">
                  {item["OF Gabery"]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
