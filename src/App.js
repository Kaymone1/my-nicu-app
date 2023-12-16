import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import InventoryList from './components/InventoryList';
import ItemDetail from './components/ItemDetail';
import ItemForm from './components/ItemForm';
import Dashboard from './components/DashBoard';
import Alerts from './components/Alerts';

function App() {
  // API URL for Django backend
  const apiURL = 'https://inventoryap-4e7068857990.herokuapp.com';

  // State for inventory items
  const [inventory, setInventory] = useState([]);

  // Fetch inventory items
  const fetchInventory = async () => {
    try {
      const response = await fetch(`${apiURL}/inventory/`);
      if (!response.ok) {
        throw new Error('Failed to fetch inventory data');
      }
      const data = await response.json();
      console.log('API Response:', data);
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  // Handle form submission for new or edited inventory items
  const handleFormSubmission = async (data, type) => {
    try {
      let response;

      if (type === 'new') {
        console.log('new')
        response = await fetch(`${apiURL}/inventory/`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        console.log('edit')
        response = await fetch(`${apiURL}/inventory/${data.id}/`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        fetchInventory();
      } else {
        console.error('Failed to submit form:', response.statusText);
      }
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };

  // Delete an inventory item
  const deleteInventoryItem = async (itemId) => {
    try {
      const response = await fetch(`${apiURL}/inventory/${itemId}/`, {
        method: 'delete',
      });

      if (response.ok) {
        fetchInventory();
      } else {
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Fetch inventory items on component mount
  useEffect(() => {
    fetchInventory();
    
  }, []);

  return (
    <div className="App">
      <h1>Kay Legendary's Neonatal Intensive Care Unit Inventory App</h1>
      <Routes>
        <Route
          path="/"
          element={<InventoryList inventory={inventory} deleteItem={deleteInventoryItem} />}
        />
        <Route
          path="/detail/:itemId"
          element={<ItemDetail inventory={inventory} onDelete={deleteInventoryItem} />}
        />
        <Route
        path="/newitem"
        element={<ItemForm formType="new" onSubmit={handleFormSubmission} inventory={inventory} />}
      />
        <Route
          path="/edit/:itemId"
          element={<ItemForm inventory={inventory} onSubmit={handleFormSubmission} formType="edit" fetchInventory={fetchInventory} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard inventory={inventory} />}
        />
        <Route
          path="/alerts"
          element={<Alerts inventory={inventory} />}
        />
      </Routes>
    </div>
  );
}

export default App;
