const sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/11GtOI28_2c391ppAxMdMqQ4-IUxye-MSJU3JUvD-Sbg/values/Feuille 1?key=AIzaSyDK6h4wsH1zrUYqV-DY9jTePnypWSdoZBA";

const processCellValue = (value) => {
  try {
    const parsedValue = JSON.parse(value);
    if (typeof parsedValue === 'object' && parsedValue !== null) {
      return parsedValue;
    }
  } catch (e) {
    // La valeur n'est pas un JSON valide, retournez la valeur telle quelle
  }
  return value;
};


export const getSheetData = async () => {
  const response = await fetch(sheetUrl);
  const data = await response.json();
  const rows = data.values.slice(1); // Supprime la première ligne (en-têtes)
  const headers = data.values[0]; // Récupère les en-têtes de la première ligne

  const formattedData = rows.map((row) => {
    const rowData = {};
    headers.forEach((header, index) => {
      rowData[header] = processCellValue(row[index]);
    });
    return rowData;
  });

  return { categories: headers, data: formattedData };
};

