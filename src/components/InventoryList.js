import React from 'react';
import { Link } from 'react-router-dom';

const InventoryList = ({ inventory, deleteItem }) => {
  return (
    <div className="container">
      <h1 className="mt-4 mb-4">
        <strong>Inventory List</strong>
      </h1>
      <Link to="/newitem">
        <button className='btn btn-primary mb-4'>Add New Item</button>
      </Link>
      <Link to="/dashboard">
        <button className='btn btn-secondary mb-4'>View Inventory Dashboard</button>
      </Link>
      
      <h6 className=" note-mb-4">*Please note: to view item details click on item name</h6>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Criticality Level</th>
              <th>Status</th>
              <th>Action</th> {/* New column for delete button */}
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link to={`/detail/${item.id}`}>
                    <strong>{item.item_name}</strong>
                  </Link>
                </td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.location}</td>
                <td>{item.criticality_level}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryList;
