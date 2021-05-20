import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import converterContants from './../../../config/converterConstants';

interface ConverterButtonProps {
  status: string;
}

const ConverterButton: React.FC<ConverterButtonProps> = ({status}) => {
  const {STATUS_ERROR} = converterContants;

  const [anchorEl, setAnchorEl] = useState<HTMLElement  | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <Button  
      disabled={status === STATUS_ERROR}
      type="submit" 
      variant="outlined" 
      color="primary" 
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Typography variant="subtitle1">
        Convert
      </Typography>
    </Button>
  )
};

export default ConverterButton;