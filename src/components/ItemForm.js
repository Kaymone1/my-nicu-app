import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ItemForm = ({ formType, inventory, onSubmit }) => {
    const navigate = useNavigate();
    const params = useParams();
  
    // Use useMemo to compute currentItem only when params.itemId or inventory changes
    const currentItem = useMemo(
      () => inventory.find((item) => item.id === parseInt(params.itemId)),
      [params.itemId, inventory]
    );
  
    // State to manage form values
    const [formData, setFormData] = useState(
      formType === 'new'
        ? {
            item_name: '',
            description: '',
            category: '',
            quantity: 0,
            unit_cost: 0.0,
            total_value: 0.0,
            supplier_name: '',
            supplier_contact: '',
            reorder_point: 0,
            expiration_date: '',
            location: '',
            updated_by: '', // New field for the user's name
          }
        : {
            item_name: currentItem?.item_name || '',
            description: currentItem?.description || '',
            category: currentItem?.category || '',
            quantity: currentItem?.quantity || 0,
            unit_cost: currentItem?.unit_cost || 0.0,
            total_value: currentItem?.total_value || 0.0,
            supplier_name: currentItem?.supplier_name || '',
            supplier_contact: currentItem?.supplier_contact || '',
            reorder_point: currentItem?.reorder_point || 0,
            expiration_date: currentItem?.expiration_date || '',
            location: currentItem?.location || '',
            updated_by: currentItem?.updated_by ||  '',
            id: parseInt(currentItem?.id) || 0,
          }
    );
 

  // useEffect to set form data when currentItem changes
  useEffect(() => {
    if (currentItem) {
      console.log('currentItem:', currentItem);
      console.log('formType:', formType);
      
      setFormData((prev) => ({
        ...prev,
        ...currentItem,
        // I want the updte author to be new every time to see who is doing what
        updated_by: formType === 'new' ? '' : '',
      }));
    }
  }, [currentItem, formType]);


  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Calculate total value if quantity or unit_cost is updated
    if (name === 'quantity' || name === 'unit_cost') {
      const quantity = name === 'quantity' ? parseInt(value) : formData.quantity;
      const unitCost = name === 'unit_cost' ? parseFloat(value) : formData.unit_cost;
      const totalValue = (quantity * unitCost).toFixed(2);
      setFormData((prevData) => ({ ...prevData, total_value: totalValue }));
    }
  };

// Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if all required fields are filled
    const requiredFields = ['item_name', 'description', 'category', 'quantity', 'unit_cost', 'total_value', 'supplier_name', 'supplier_contact', 'reorder_point', 'expiration_date', 'location', 'updated_by'];
    // Check if all required fields are filled
    const isFormValid = requiredFields.every(field => String(formData[field]).trim() !== ''); // every and trim functions to turn my fields into strings and check if its empty and ensure users dont leave unnecessary spaces
  
    if (isFormValid) {
      // Submit the form data
      onSubmit(formData, formType);
      navigate('/');
    } else {
      // Show an alert if not all required fields are filled
      alert('Please fill in all required fields.');
    }
  };

  // Array of available categories
  const categories = ['Medical Supplies', 'Diapers', 'Equipment', 'Pharmaceuticals', 'Consumables', 'Clothing', 'Technology'];

  // Array of available locations
  const locations = ['Location1', 'Location2', 'Location3', 'Location4', 'Location5'];

  // Array of available criticality levels
  const criticalityLevels = ['High', 'Medium', 'Low'];

  //Array for status dropdown
  const statusChoices = ['Active', 'Inactive', 'Out of Stock', 'Reorder'];



  return (
    <div className="container">
      <h2>Add/Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Item Name:</label>
          <input type="text" className="form-control" name="item_name" value={formData.item_name} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Category:</label>
          <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity:</label>
          <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Unit Cost($):</label>
          <input type="number" className="form-control" name="unit_cost" value={formData.unit_cost} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Value($):</label>
          <input type="number" className="form-control" name="total_value" value={formData.total_value} onChange={handleChange} disabled />
        </div>

        <div className="mb-3">
          <label className="form-label">Supplier Name:</label>
          <input type="text" className="form-control" name="supplier_name" value={formData.supplier_name} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Supplier Contact:</label>
          <input type="text" className="form-control" name="supplier_contact" value={formData.supplier_contact} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Reorder Point:</label>
          <input type="number" className="form-control" name="reorder_point" value={formData.reorder_point} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Expiration Date:</label>
          <input type="date" className="form-control" name="expiration_date" value={formData.expiration_date} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Location:</label>
          <select className="form-select" name="location" value={formData.location} onChange={handleChange}>
            <option value={formData.location}>Select a Location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Criticality Level:</label>
          <select className="form-select" name="criticality_level" value={formData.criticality_level} onChange={handleChange}>
            <option value="">Select a Criticality Level</option>
            {criticalityLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      <div className="mb-3">
          <label className="form-label">Status:</label>
          <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
            <option value="">Select a Status</option>
            {statusChoices.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Updated By field */}
        <div className="mb-3">
          <label className="form-label">Updated By:</label>
          <input type="text" className="form-control" name="updated_by" value={formData.updated_by} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-secondary go">Go Back</Link>
        </div>
      </form>
    </div>
  );
};
export default ItemForm;
