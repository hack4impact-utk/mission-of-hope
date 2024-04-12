'use client';
import { Button, InputLabel, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import styles from './styles.module.css';

export default function DonationsForm() {
  const [donorData, setDonorData] = useState({
    donorName: '',
    donationDate: '',
    category: '',
    donatedItem: '',
    quantity: '',
    alertQuantity: '',
    itemValue: '',
    donationValue: '',
    prevDonated: false,
    user: '',
    dropdownDonorName: '',
    donorEmail: '',
    donorPhone: '',
    donorAddress: '',
    donorCity: '',
    donorState: '',
    donorZip: '',
  });

  const handleAddDonation = () => {
    alert('Donation added successfully!');
  };

  return (
    <>
      {' '}
      <h1 className={styles.headerTitle}>Add Donations</h1>
      <hr></hr>
      <div className={styles.donationsFormContainer}>
        <div className={styles.nameAndDateContainer}>
          <TextField
            className={styles.donorNameField}
            id="outlined-required"
            label="Donor Name"
            value={donorData.donorName}
            onChange={(e) =>
              setDonorData({ ...donorData, donorName: e.target.value })
            }
          />
          <TextField
            className={styles.donationDateField}
            id="outlined-required"
            value={donorData.donationDate}
            type="date"
            onChange={(e) => {
              setDonorData({ ...donorData, donationDate: e.target.value });
            }}
          />
        </div>
        <TextField
          className={styles.categoryField}
          id="outlined-required"
          label="Category"
          value={donorData.category}
          onChange={(e) => {
            setDonorData({ ...donorData, category: e.target.value });
          }}
        />
        <div className={styles.thirdRowContainer}>
          <TextField
            className={styles.donatedItemField}
            label="Donated Item"
            id="outlined-multiline-static"
            value={donorData.donatedItem}
            onChange={(e) => {
              setDonorData({ ...donorData, donatedItem: e.target.value });
            }}
          />
          <TextField
            className={styles.quantityField}
            id="outlined-required"
            label="Quantity"
            type="number"
            value={donorData.quantity}
            onChange={(e) => {
              setDonorData({ ...donorData, quantity: e.target.value });
            }}
          />
        </div>
        <div className={styles.fourthRowContainer}>
          <TextField
            id="outlined-required"
            label="Item Value"
            type="number"
            value={donorData.itemValue}
            onChange={(e) => {
              setDonorData({ ...donorData, itemValue: e.target.value });
            }}
          />
          <TextField
            id="outlined-required"
            label="Donation Value"
            type="number"
            value={donorData.donationValue}
            onChange={(e) => {
              setDonorData({ ...donorData, donationValue: e.target.value });
            }}
          />
          <TextField
            className={styles.alertQuantityField}
            id="outlined-required"
            label="High or Low Value"
            value={donorData.alertQuantity}
            onChange={(e) => {
              setDonorData({ ...donorData, alertQuantity: e.target.value });
            }}
          />
        </div>
        <TextField
          className={styles.userField}
          id="outlined-required"
          label="User"
          value={donorData.user}
          onChange={(e) => {
            setDonorData({ ...donorData, user: e.target.value });
          }}
        />
        <div className={styles.lastRowContainer}>
          <Button
            className={styles.addDonationButton}
            variant="contained"
            color="success"
            onClick={handleAddDonation}
          >
            Add Donation
          </Button>
          <FormControl variant="filled" className={styles.donorDonatedSelect}>
            <InputLabel id="demo-simple-select-filled-label">
              Has this donor previously donated?
            </InputLabel>
            <Select
              value={donorData.prevDonated ? 'yes' : 'no'}
              onChange={(e) => {
                setDonorData({
                  ...donorData,
                  prevDonated: e.target.value === 'yes',
                });
              }}
              label="Has this donor previously donated?"
              id="donor-donated"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </div>

        {donorData.prevDonated && (
          <Typography component="h3" mb={1}>
            Please fill out the email before proceeding
          </Typography>
        )}
        {/* For when user selects from yes/no dropdown */}
        <div className={styles.nameEmailPhone}>
          <TextField
            label="Email"
            id="outlined-required"
            value={donorData.donorEmail}
            onChange={(e) => {
              setDonorData({ ...donorData, donorEmail: e.target.value });
            }}
            type="email"
          />
          <TextField
            id="outlined-required"
            label="Donor Name"
            value={donorData.dropdownDonorName}
            onChange={(e) => {
              setDonorData({ ...donorData, dropdownDonorName: e.target.value });
            }}
          />
          <TextField
            label="Phone"
            id="outlined-required"
            type="tel"
            value={donorData.donorPhone}
            onChange={(e) => {
              setDonorData({ ...donorData, donorPhone: e.target.value });
            }}
          />
        </div>
        <div className={styles.addressCityStateZip}>
          <TextField
            label="Address"
            id="outlined-required"
            value={donorData.donorAddress}
            onChange={(e) => {
              setDonorData({ ...donorData, donorAddress: e.target.value });
            }}
          />
          <TextField
            label="City"
            id="outlined-required"
            value={donorData.donorCity}
            onChange={(e) => {
              setDonorData({ ...donorData, donorCity: e.target.value });
            }}
          />
          <TextField
            label="State"
            id="outlined-required"
            value={donorData.donorState}
            onChange={(e) => {
              setDonorData({ ...donorData, donorState: e.target.value });
            }}
          />
          <TextField
            label="Zip"
            id="outlined-required"
            value={donorData.donorZip}
            type="number"
            onChange={(e) => {
              setDonorData({ ...donorData, donorZip: e.target.value });
            }}
          />
        </div>
      </div>
    </>
  );
}
