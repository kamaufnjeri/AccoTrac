import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddAccountForm = () => {
  // using useState to manage information entered to the forms for creating account
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sub_category: '',
  });

  // handling change when a user inputs info on the for
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // submitting information entered to user and connecting to the backend to save the dat
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // using axios to post to the backend
      const response = await axios.post('http://localhost:5000/createaccount', formData, { withCredentials: true });
      if (response.status === 201) {
        console.log(response.data);
        toast.success("Success creating account");
        setFormData({
          name: '',
          category: '',
          sub_category: '',
        });
      } else {
        console.log(response.data);
        throw new Error(response.data.response)
      }
    } catch (error) {
      if (error.response.data) {
        toast.error("Error adding account: " + error.response.data.response);
      }
      toast.error("Error adding account: " + error);
    }
  };

  // categories to use fo select option of category
  const categories = {
    Asset: 'asset',
    Liability: 'liability',
    Capital: 'capital',
    Revenue: 'revenue',
    Expense: 'expense'
  };

  // sub_categories to be displayed depending on the category chosen for user to choose
  const subCategories = {
    asset: ['bank', 'accounts_receivable', 'cash', 'inventory', 'fixed_asset'],
    liability: ['accounts_payable', 'long_term_loan'],
    capital: ['capital'],
    revenue: ['sales_revenue', 'revenue'],
    expense: ['cost_of_goods_sold', 'expense'],
  };

  // function to change how the select values are displayed to user
  const formatName = (name) => {
    // change first letter of the word to capital and replace '_' with space
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  return (
    <div className="container mt-5">
      <h2>Add Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            
            value={formatName(formData.name)}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category:</label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select category...</option>
            {Object.keys(categories).map((key) => (
              <option key={categories[key]} value={categories[key]}>
                {key}
              </option>
            ))}
          </select>
        </div>
        {formData.category && (
          <div className="mb-3">
            <label htmlFor="sub_category" className="form-label">Sub Category:</label>
            <select
              className="form-select"
              id="sub_category"
              name="sub_category"
              value={formData.sub_category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select sub category...</option>
              {subCategories[formData.category].map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {formatName(subCategory)}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddAccountForm;
