import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import ICurrency from './../../../interfaces/ICurrency';

interface CurrencyFieldProps {
  label: string; 
  currencyValue: string; 
  onChangeCallBack: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  currencies: ICurrency[];
}

const CurrencyField: React.FC<CurrencyFieldProps> = (
    {label, currencyValue, onChangeCallBack, currencies}
  ) => {
  return (
    <TextField 
      label={label}
      select 
      value={currencyValue} 
      onChange={onChangeCallBack}
      helperText="Please select your currency"
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