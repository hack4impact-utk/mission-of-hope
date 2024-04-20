import { Grid } from '@mui/material';

export default function signIn() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="stretch"
      margin={0}
      sx={{ background: 'green', height: '100vh', overflow: 'hidden' }}
    >
      <Grid
        sx={{ background: 'red' }}
        xs={5}
        justifyContent="center"
        alignItems="center"
      >
        {/* <Image
          src={
            'https://missionofhope.org/wp-content/uploads/2023/04/cropped-MOH-Logo.png'
          }
          alt={'Mission of Hope Logo'}
          fill={true}
        ></Image> */}
        1
      </Grid>
      <Grid xs={5} sx={{ background: 'blue' }}>
        2
      </Grid>
    </Grid>
  );
}
