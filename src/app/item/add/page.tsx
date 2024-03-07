import React from 'react';

const AddDonationForm = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Add Donation</h2>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="donorName">Donor Name</label>
          <input type="text" id="donorName" style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="donationDate">Donation Date</label>
          <input type="date" id="donationDate" style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="category">Category</label>
          <input type="text" id="category" style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="donatedItem">Donated Item</label>
          <input type="text" id="donatedItem" style={{ width: '100%' }} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div style={{ flex: '1', marginRight: '5px' }}>
            <label htmlFor="itemValue">Item Value</label>
            <input type="text" id="itemValue" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: '1', marginLeft: '5px' }}>
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" style={{ width: '100%' }} />
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="donationValue">Donation Value</label>
          <input type="text" id="donationValue" style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="highOrLowValue">High or Low Value</label>
          <select id="highOrLowValue" style={{ width: '100%' }}>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="user">User</label>
          <input type="text" id="user" style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="hasDonatedBefore">
            Has this donor previously donated?
          </label>
          <select id="hasDonatedBefore" style={{ width: '100%' }}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Donation
        </button>
      </form>
    </div>
  );
};

export default AddDonationForm;
