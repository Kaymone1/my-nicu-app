import React, { useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ItemDetail = ({ inventory, onDelete }) => {
  const params = useParams();
  console.log(params)
  const navigate = useNavigate();

  // Use useMemo to compute currentItem only when params.itemId or inventory changes
  const currentItem = useMemo(
    () => inventory.find((item) => item.id === parseInt(params.itemId)),
    [params.itemId, inventory]
  );

  // Check if currentItem is undefined
  if (!currentItem) {
    return <div>Loading...</div>; // to show a loading message or redirect to an error page
  }

  const handleDelete = () => {
    // Call the onDelete function from the parent component
    onDelete(currentItem.id);

    // Redirect to the home page after deletion
    navigate('/');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h1><strong>{currentItem.item_name}</strong></h1>
          <p>Description: {currentItem.description}</p>
          <p>Category: {currentItem.category}</p>
          <p>Quantity: {currentItem.quantity}</p>
          <p>Unit Cost: {currentItem.unit_cost}</p>
          <p>Total Value: {currentItem.total_value}</p>
          <p>Supplier: {currentItem.supplier_name}</p>
          <p>Reorder Point: {currentItem.reorder_point}</p>
          <p>Expiration Date: {currentItem.expiration_date}</p>
          <p>Location: {currentItem.location}</p>
          <p>Last Updated By: {currentItem.updated_by}</p>
          <p>Last Updated: {new Date(currentItem.last_updated).toLocaleString()}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <Link to={`/edit/${params.itemId}`}>
            <button className="btn btn-primary edit-button">Edit</button>
          </Link>
        </div>
        <div className="col-md-6">
          <button className="btn btn-danger delete-button" onClick={handleDelete}>Delete Item</button>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <Link to="/">
            <button className="btn btn-secondary go-back-button">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default ItemDetail;
