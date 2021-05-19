import React from 'react';
import Converter from './components/Converter/Converter';
import styles from './AppStyles';
import { Grid } from '@material-ui/core';

function App() {
  const classes = styles();
  return (
    <Grid 
      container 
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Converter />
    </Grid>
  );
}

export default App;
