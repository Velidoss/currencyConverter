import { Typography } from '@material-ui/core';
import React from 'react';
import styles from './ConverterTitleStyles';

const ConverterTitle: React.FC = () => {
  const classes = styles();
  return (
    <Typography variant="h1" align="center" className={classes.converterTitle}>
      Currency Converter
    </Typography>
  )
};

export default ConverterTitle;