import React from 'react';
import { MenuItem, TextField, Typography } from '@material-ui/core';
import ICurrency from './../../../interfaces/ICurrency';
import styles from '../ConverterStyles';

interface CurrencyFieldProps {
  label: string; 
  currencyValue: string; 
  onChangeCallBack: (newValue: string) => void; 
  currencies: ICurrency[];
}

const CurrencyField: React.FC<CurrencyFieldProps> = React.memo((
    {label, currencyValue, onChangeCallBack, currencies}
  ) => {
  const classes = styles();
  return (
    <TextField 
      label={<Typography variant="subtitle2" >{label}</Typography>}
      select 
      value={currencyValue} 
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeCallBack(event.target.value)}
      variant="outlined"
      className={classes.gridAmountField}
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