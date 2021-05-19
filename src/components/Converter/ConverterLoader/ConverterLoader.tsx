import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './ConverterLoaderStyles';
import { Grid } from '@material-ui/core';

const ConverterLoader: React.FC = () => {
  const classes = styles();
  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      <CircularProgress />
    </Grid>
  )
};

export default ConverterLoader;