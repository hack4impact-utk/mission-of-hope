import {
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Grid,
} from '@mui/material'; //import necessary components from material ui
import './styles.css'; //import css

const AddDonationForm = () => {
  return (
    <>
      {/*  need to put in navbar when finished */}
      <div className="topBar">{/* need to put in profile icon */}</div>
      <div className="title">
        <h1>Add Donation</h1>
      </div>
      <div className="vector">{/* vector as seen on figma */}</div>
      <div className="form-container">
        <Grid container spacing={3} justifyContent="left">
          {/* Start of grid container */}
          {/* Each box is seperated into a grid item */}
          {/* xs and sm control the size of the element out of a 12 basis */}
          <Grid item xs={12} sm={8}>
            <TextField
              id="donorName"
              label="Donor Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="date"
              id="donationDate"
              label="Donation Date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="category"
              label="Category"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              id="donatedItem"
              label="Donated Item"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              type="number"
              id="quantity"
              label="Quantity"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="itemValue"
              label="Item Value"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="donationValue"
              label="Donation Value"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="highOrLowValue-label">
                High or Low Value
              </InputLabel>
              <Select
                labelId="highOrLowValue-label"
                id="highOrLowValue"
                label="High or Low Value"
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              id="user"
              label="User"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ height: '60px', textTransform: 'none' }}
              className="submit-button"
            >
              Add Donation
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="hasDonatedBefore-label">
                Has this donor previously donated?
              </InputLabel>
              <Select
                labelId="hasDonatedBefore-label"
                id="hasDonatedBefore"
                label="Has this donor previously donated?"
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4.5}>
            <TextField
              id="donorName"
              label="Donor Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={4.5}>
            <TextField
              type="email"
              id="donorEmail"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              type="tel"
              id="donorPhone"
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4.5}>
            <TextField
              id="donorAddress"
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="donorCity"
              label="City"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="donorState"
              label="State"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={2.5}>
            <TextField
              id="donorZip"
              label="Zip Code"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
// Export the form
export default AddDonationForm;
