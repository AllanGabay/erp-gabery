import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DataDisplay.css";

const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const apiKey = "AIzaSyDK6h4wsH1zrUYqV-DY9jTePnypWSdoZBA";
    const sheetId = "11GtOI28_2c391ppAxMdMqQ4-IUxye-MSJU3JUvD-Sbg";
    const sheetRange = "Sheet1!A1:D";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;

    try {
      const response = await axios.get(url);
      setData(response.data.values.slice(1)); // Enlève l'en-tête des colonnes
    } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
    }
  };

  return (
    <div className="data-display">
      {data.map((item, index) => (
        <div key={index} className="data-item">
          <div>{item[0]}</div>
          <div>{item[1]}</div>
          <div>{item[2]}</div>
          <div>{item[3]}</div>
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;
