import React from 'react';
import { MenuItem, TextField, Typography } from '@material-ui/core';
import ICurrency from './../../../interfaces/ICurrency';

interface CurrencyFieldProps {
  label: string; 
  currencyValue: string; 
  onChangeCallBack: (newValue: string) => void; 
  currencies: ICurrency[];
}

const CurrencyField: React.FC<CurrencyFieldProps> = React.memo((
    {label, currencyValue, onChangeCallBack, currencies}
  ) => {
  console.log('render');
  return (
    <TextField 
      label={<Typography variant="subtitle2" >{label}</Typography>}
      select 
      value={currencyValue} 
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeCallBack(event.target.value)}
      variant="outlined"
    >
      {currencies.map((currency: ICurrency) => (
        <MenuItem defaultValue="USD" key={currency.id} value={currency.id}>
          {`${currency.id} - ${currency.currencyName}`}
        </MenuItem>
      ))}
    </TextField>
  )
});

export default CurrencyField;