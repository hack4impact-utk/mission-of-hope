'use client';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import styles from './styles.module.css';

export default function DonationsForm() {
  const [donorName, setDonorName] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [category, setCategory] = useState('');
  const [donatedItem, setDonatedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [alertQuantity, setAlertQuantity] = useState('');

  const handleAddDonation = () => {
    // FOR DEMO PURPOSES ONLY
    alert('Donation added successfully!');
    console.log('Donation added successfully!', {
      donorName,
      donationDate,
      category,
      donatedItem,
      quantity,
      alertQuantity,
    });
    // ********************
    setDonorName('');
    setDonationDate('');
    setCategory('');
    setDonatedItem('');
    setQuantity('');
    setAlertQuantity('');
  };

  return (
    <div className={styles.donationsFormContainer}>
      <h1>Add Donations</h1>
      <div className={styles.nameAndDateContainer}>
        <TextField
          className={styles.donorNameField}
          id="outlined-required"
          label="Donor Name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
        />
        <TextField
          className={styles.donationDateField}
          id="outlined-required"
          value={donationDate}
          type="date"
          onChange={(e) => setDonationDate(e.target.value)}
        />
      </div>
      <TextField
        className={styles.categoryField}
        id="outlined-required"
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <div className={styles.thirdRowContainer}>
        <TextField
          className={styles.donatedItemField}
          label="Donated Item"
          id="outlined-multiline-static"
          multiline
          rows={4}
          value={donatedItem}
          onChange={(e) => setDonatedItem(e.target.value)}
        />
        <div className={styles.quantityAndAlertContainer}>
          <TextField
            className={styles.quantityField}
            id="outlined-required"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            className={styles.alertQuantityField}
            id="outlined-required"
            label="Alert when below:"
            value={alertQuantity}
            onChange={(e) => setAlertQuantity(e.target.value)}
          />
        </div>
      </div>
      <Button
        className={styles.addDonationButton}
        variant="contained"
        color="success"
        onClick={handleAddDonation}
      >
        Add Donation
      </Button>
    </div>
  );
}
