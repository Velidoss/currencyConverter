import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './ConverterLoaderStyles';
import { Grid, Typography } from '@material-ui/core';

interface ConverterLoaderProps {
  error?: boolean;
}

const ConverterLoader: React.FC<ConverterLoaderProps> = ({error}) => {
  const classes = styles();
  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      {
        error && (
          <Typography>
            Sorry, but API call limit has been reached. Try to use app after 1 hour.
          </Typography>
        )
      }
      <CircularProgress />
    </Grid>
  )
};

export default ConverterLoader;