import React from 'react';
import './styles.css'; // Make sure the path is correct

const AddDonationForm = () => {
  return (
    <div className="form-container">
      <h2>Add Donation</h2>
      <form>
        <div className="form-group">
          <label htmlFor="donorName">Donor Name</label>
          <input type="text" id="donorName" />
        </div>
        <div className="form-group">
          <label htmlFor="donationDate">Donation Date</label>
          <input type="date" id="donationDate" />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" id="category" />
        </div>
        <div className="form-group">
          <label htmlFor="donatedItem">Donated Item</label>
          <input type="text" id="donatedItem" />
        </div>
        <div className="form-group flex">
          <div className="flex-item">
            <label htmlFor="itemValue">Item Value</label>
            <input type="text" id="itemValue" />
          </div>
          <div className="flex-item">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="donationValue">Donation Value</label>
          <input type="text" id="donationValue" />
        </div>
        <div className="form-group">
          <label htmlFor="highOrLowValue">High or Low Value</label>
          <select id="highOrLowValue">
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="user">User</label>
          <input type="text" id="user" />
        </div>
        <div className="form-group">
          <label htmlFor="hasDonatedBefore">
            Has this donor previously donated?
          </label>
          <select id="hasDonatedBefore">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Add Donation
        </button>
      </form>
    </div>
  );
};

export default AddDonationForm;
