import React from 'react';
import { Typography } from '@material-ui/core';


const ConverterError: React.FC = () => (
  <Typography color="error" >
    Sorry, but API call limit has been reached. Try to use app after 1 hour.
  </Typography>
);

export default ConverterError;