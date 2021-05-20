import { Button, Typography } from '@material-ui/core';
import React from 'react';
import converterContants from './../../../config/converterConstants';

interface ConverterButtonProps {
  status: string;
}

const ConverterButton: React.FC<ConverterButtonProps> = ({status}) => {
  const {STATUS_ERROR} = converterContants;

  return (
    <Button  
      disabled={status === STATUS_ERROR}
      type="submit" 
      variant="outlined" 
      color="primary" 
    >
      <Typography variant="subtitle1">
        Convert
      </Typography>
    </Button>
  )
};

export default ConverterButton;