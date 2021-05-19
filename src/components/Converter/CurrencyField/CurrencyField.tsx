import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import ICurrency from './../../../interfaces/ICurrency';

interface CurrencyFieldProps {
  label: string; 
  currencyValue: string; 
  onChangeCallBack: (newValue: string) => void; 
  currencies: ICurrency[];
}

const CurrencyField: React.FC<CurrencyFieldProps> = (
    {label, currencyValue, onChangeCallBack, currencies}
  ) => {
  console.log('render');
  return (
    <TextField 
      label={label}
      select 
      value={currencyValue} 
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeCallBack(event.target.value)}
      helperText="Please select your currency"
      variant="outlined"
    >
      {currencies.map((currency: ICurrency) => (
        <MenuItem defaultValue="USD" key={currency.id} value={currency.id}>
          {`${currency.id} - ${currency.currencyName}`}
        </MenuItem>
      ))}
    </TextField>
  )
};

export default CurrencyField;