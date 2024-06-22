import React, { useEffect, useState } from 'react';
import './App.css';
import data from './bikes_response.json';

function App() {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showClearButton, setShowClearButton] = useState(false);
  const [showEmptySearchAlert, setShowEmptySearchAlert] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    setTableData(data);
    setFilteredData(data);
  }, []);

  useEffect(() => {
    if (sortConfig.key !== null) {
      const sortedData = [...filteredData].sort((a, b) => {
        if (sortConfig.key === 'Description') {
          return 0; 
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setFilteredData(sortedData);
    }
  }, [sortConfig, filteredData]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setShowEmptySearchAlert(true);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = tableData.filter((item) =>
      (item.BikeID && item.BikeID.toString().toLowerCase().includes(query)) ||
      (item.Make && item.Make.toLowerCase().includes(query)) ||
      (item.Model && item.Model.toLowerCase().includes(query)) ||
      (item.Year && item.Year.toString().toLowerCase().includes(query)) ||
      (item.Displacement && item.Displacement.toString().toLowerCase().includes(query)) ||
      (item.Price && item.Price.toString().toLowerCase().includes(query)) ||
      (item.Terrain && item.Terrain.toLowerCase().includes(query)) ||
      (item.Description && item.Description.toLowerCase().includes(query))
    );
    setFilteredData(filtered);
    setShowClearButton(true);
    setShowEmptySearchAlert(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredData(tableData);
    setShowClearButton(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return null;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bike Models Overview</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="clear-button" onClick={handleSearch}>Search</button>
          {showClearButton && (
            <button className="clear-button" onClick={handleClearSearch}>Clear</button>
          )}
        </div>
        {showEmptySearchAlert && (
          <div className="empty-search-alert">
            Please populate the search box.
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('Make')} className="sortable-header">
                Make {getSortIndicator('Make')}
              </th>
              <th onClick={() => handleSort('Model')} className="sortable-header">
                Model {getSortIndicator('Model')}
              </th>
              <th onClick={() => handleSort('Year')} className="sortable-header">
                Year {getSortIndicator('Year')}
              </th>
              <th onClick={() => handleSort('Displacement')} className="sortable-header">
                Displacement {getSortIndicator('Displacement')}
              </th>
              <th onClick={() => handleSort('Price')} className="sortable-header">
                Price {getSortIndicator('Price')}
              </th>
              <th onClick={() => handleSort('Terrain')} className="sortable-header">
                Terrain {getSortIndicator('Terrain')}
              </th>
              <th className="underline-header">Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.BikeID}>
                <td>{item.Make}</td>
                <td>{item.Model}</td>
                <td>{item.Year}</td>
                <td>{item.Displacement}</td>
                <td>{item.Price}</td>
                <td>{item.Terrain}</td>
                <td>{item.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
