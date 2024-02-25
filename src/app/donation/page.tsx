'use client';
import { Button, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
  const [itemValue, setItemValue] = useState('');
  const [donationValue, setDonationValue] = useState('');
  const [prevDonated, setPrevDonated] = useState(false);
  const [user, setUser] = useState('');
  const [dropdownDonorName, setDropdownDonarName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [donorCity, setDonorCity] = useState('');
  const [donorState, setDonorState] = useState('');
  const [donorZip, setDonorZip] = useState('');

  const handleAddDonation = () => {
    alert('Donation added successfully!');
    setDonorName('');
    setDonationDate('');
    setCategory('');
    setDonatedItem('');
    setQuantity('');
    setAlertQuantity('');
    setItemValue('');
    setDonationValue('');
    setUser('');
    setPrevDonated(false);
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
            value={donatedItem}
            onChange={(e) => setDonatedItem(e.target.value)}
          />
          <TextField
            className={styles.quantityField}
            id="outlined-required"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className={styles.fourthRowContainer}>
          <TextField
            id="outlined-required"
            label="Item Value"
            type="number"
            value={itemValue}
            onChange={(e) => setItemValue(e.target.value)}
          />
          <TextField
            id="outlined-required"
            label="Donation Value"
            type="number"
            value={donationValue}
            onChange={(e) => setDonationValue(e.target.value)}
          />
          <TextField
            className={styles.alertQuantityField}
            id="outlined-required"
            label="High or Low Value"
            value={alertQuantity}
            onChange={(e) => setAlertQuantity(e.target.value)}
          />
        </div>
        <TextField
          className={styles.userField}
          id="outlined-required"
          label="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
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
              value={prevDonated ? 'yes' : 'no'}
              onChange={(e) => setPrevDonated(e.target.value === 'yes')}
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
            value={dropdownDonorName}
            onChange={(e) => setDropdownDonarName(e.target.value)}
          />
          <TextField
            label="Email"
            id="outlined-required"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            type="email"
          />
          <TextField
            label="Phone"
            id="outlined-required"
            type="tel"
            value={donorPhone}
            onChange={(e) => setDonorPhone(e.target.value)}
          />
        </div>
        <div className={styles.addressCityStateZip}>
          <TextField
            label="Address"
            id="outlined-required"
            value={donorAddress}
            onChange={(e) => setDonorAddress(e.target.value)}
          />
          <TextField
            label="City"
            id="outlined-required"
            value={donorCity}
            onChange={(e) => setDonorCity(e.target.value)}
          />
          <TextField
            label="State"
            id="outlined-required"
            value={donorState}
            onChange={(e) => setDonorState(e.target.value)}
          />
          <TextField
            label="Zip"
            id="outlined-required"
            value={donorZip}
            type="number"
            onChange={(e) => setDonorZip(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
