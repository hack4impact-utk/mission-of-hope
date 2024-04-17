'use client';
import AutofillDonorEmail from '@/components/AutofillDonorEmail';
import { DonorResponse } from '@/types/persons';
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import styles from './styles.module.css';

interface AddDonationViewProps {
  donorOptions: DonorResponse[];
}

export default function AddDonationView({
  donorOptions,
}: AddDonationViewProps) {
  const [donorData, setDonorData] = useState({
    donorName: '',
    donationDate: '',
    category: '',
    donatedItem: '',
    quantity: '',
    alertQuantity: '',
    newOrUsed: '',
    price: '',
    prevDonated: false,
    user: '',
    donorAddress: '',
    donorCity: '',
    donorState: '',
    donorZip: '',
  });

  const handleDonorSelect = (selectedDonor: DonorResponse) => {
    setDonorData({
      ...donorData,
      donorName: `${selectedDonor.firstName} ${selectedDonor.lastName}`,
      donorAddress: selectedDonor.address,
      donorCity: selectedDonor.city,
      donorState: selectedDonor.state,
      donorZip: selectedDonor.zip.toString(),
    });
  };

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
          <AutofillDonorEmail
            DonorOptions={donorOptions}
            onDonorSelect={handleDonorSelect}
          />
          <TextField
            className={styles.donationDateField}
            id="outlined-required"
            value={donorData.donationDate}
            type="date"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, donationDate: e.target.value });
            }}
          />
        </div>
        <TextField
          className={styles.categoryField}
          id="outlined-required"
          label="Category"
          value={donorData.category}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDonorData({ ...donorData, category: e.target.value });
          }}
        />
        <div className={styles.thirdRowContainer}>
          <TextField
            className={styles.donatedItemField}
            label="Donated Item"
            id="outlined-multiline-static"
            value={donorData.donatedItem}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, donatedItem: e.target.value });
            }}
          />
          <TextField
            className={styles.quantityField}
            id="outlined-required"
            label="Quantity"
            type="number"
            value={donorData.quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, quantity: e.target.value });
            }}
          />
        </div>
        <div className={styles.fourthRowContainer}>
          <FormControl variant="outlined" className={styles.newOrUsedSelect}>
            <InputLabel id="demo-simple-select-filled-label">
              New or Used
            </InputLabel>
            <Select
              value={donorData.newOrUsed}
              onChange={(e) => {
                setDonorData({ ...donorData, newOrUsed: e.target.value });
              }}
              label="New or Used"
              id="new-or-used"
            >
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="used">Used</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className={styles.alertQuantityField}
            id="outlined-required"
            label="High or Low Value"
            value={donorData.alertQuantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, alertQuantity: e.target.value });
            }}
          />
          <TextField
            id="outlined-required"
            label="Price"
            type="number"
            value={donorData.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, price: e.target.value });
            }}
          />
        </div>
        <TextField
          className={styles.userField}
          id="outlined-required"
          label="User"
          value={donorData.user}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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

        {/* For when user selects from yes/no dropdown */}
        <div className={styles.nameEmailPhone}>
          <TextField
            id="outlined-required"
            label="Donor Name"
            value={donorData.donorName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, donorName: e.target.value });
            }}
          />
        </div>
        <div className={styles.addressCityStateZip}>
          <TextField
            label="Address"
            id="outlined-required"
            value={donorData.donorAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, donorAddress: e.target.value });
            }}
          />
          <TextField
            label="City"
            id="outlined-required"
            value={donorData.donorCity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, donorCity: e.target.value });
            }}
          />
          <TextField
            label="State"
            id="outlined-required"
            value={donorData.donorState}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, donorState: e.target.value });
            }}
          />
          <TextField
            label="Zip"
            id="outlined-required"
            value={donorData.donorZip.toString()}
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({
                ...donorData,
                donorZip: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </>
  );
}
