import React, { useState, useEffect } from 'react';
import Alerts from "./Alerts";
import { Link } from 'react-router-dom';

const Dashboard = ({ inventory }) => {
  const [dashboardData, setDashboardData] = useState({
    totalItems: 0,
    lowStockItems: 0,
    itemsToReorder: [],
    categoryDistribution: {},
    expiringItems: [],
  });
// seperate states to manipulate how i see fit
  const [itemsToReorder, setItemsToReorder] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Calculate total items
    const totalItems = inventory.reduce((acc, item) => acc + item.quantity, 0);

    // Identify low stock items and items to reorder
    const lowStockItems = inventory.filter((item) => item.quantity <= item.reorder_point);
    const itemsToReorder = lowStockItems.filter((item) => !dashboardData.itemsToReorder.includes(item.item_id));

    // Calculate category distribution
    const categoryDistribution = inventory.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

  //  check for todays date to track how close to expirations
    const today = new Date(); 
    // Identify expiring items within 2 weeks
    const twoWeeksFromNow = new Date(today);
    twoWeeksFromNow.setDate(today.getDate() + 14);

    const expiringItems = inventory.filter((item) => {
      // Check if the item has an expiration date
      const expirationDate = item.expiration_date && new Date(item.expiration_date);
      // Check if the expiration date is within the next two weeks
      return expirationDate && expirationDate <= twoWeeksFromNow;
    });

    // Check for items reaching reorder point
    const itemsReachingReorderPoint = inventory.filter((item) => item.quantity === item.reorder_point);

    // Show alerts for items reaching reorder point and expiring items
    if (itemsReachingReorderPoint.length > 0 || expiringItems.length > 0) {
      const message = `Alert:
        Items reaching reorder point: ${itemsReachingReorderPoint.map((item) => item.item_name).join(', ')}
        Expiring items: ${expiringItems.map((item) => item.item_name).join(', ')}
      `;

      setAlertMessage(message);
    }

    // Update itemsToReorder separately to avoid the loop
    setDashboardData((prevDashboardData) => ({
      ...prevDashboardData,
      totalItems,
      lowStockItems: lowStockItems.length,
      categoryDistribution,
      expiringItems,
    }));

    // Update itemsToReorder state separately
    setItemsToReorder(itemsToReorder);
  }, [inventory]);
  // Alert will go away after 20 seconds
  const handleAlertClose = () => {
    setAlertMessage('');
  };

  return (
    <div className="container">
      {/* Dashboard Summary */}
      <h2 className="mt-4 mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <p>Total Items: {dashboardData.totalItems}</p>
        </div>
        <div className="col-md-4">
          <p>Low Stock Items: {dashboardData.lowStockItems}</p>
        </div>
        <div className="col-md-4">
          <p>Items to Reorder: {itemsToReorder.length}</p>
        </div>
      </div>

      {/* Category Distribution */}
      <h3 className="mt-4">Category Distribution</h3>
      <ul>
        {Object.entries(dashboardData.categoryDistribution).map(([category, count]) => (
          <li key={category}>{category}: {count}</li>
        ))}
      </ul>

      {/* Low Stock Items */}
      <h3 className="mt-4">Low Stock Items</h3>
      <ul>
        {itemsToReorder.map((item) => (
          <li key={item.id}>
            <Link to={`/detail/${item.id}`}>
              {item.item_name} - Quantity: {item.quantity}, Reorder Point: {item.reorder_point}
            </Link>
          </li>
        ))}
      </ul>

      {/* Expiring Items */}
      <h3 className="mt-4">Expiring Items (Within 2 Weeks)</h3>
      <ul>
        {dashboardData.expiringItems.map((item) => (
          <li key={item.id}>
            <Link to={`/detail/${item.id}`}>
              {item.item_name} - Expires on: {item.expiration_date}
            </Link>
          </li>
        ))}
      </ul>

      {/* Alert */}
      <Alerts message={alertMessage} onClose={handleAlertClose} />

      {/* Go Back Button */}
      <Link to="/">
        <button className="btn btn-primary mt-4">Go Back</button>
      </Link>
    </div>
  );
};

export default Dashboard;
