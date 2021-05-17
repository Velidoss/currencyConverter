import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const Converter: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [currentCurrency, setCurrentCurrency] = useState<string>('EUR');
  const [targetCurrency, setTargetCurrency] = useState<string>('BTC');
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  }

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCurrency(event.target.value);
  }
  const handleTargetCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetCurrency(event.target.value);
  }

  return (
    <form >
      <div>
        <TextField label="Amount" type="number" value={amount} onChange={handleAmountChange} />        
        <TextField 
          label="Current currency" 
          select 
          value={currentCurrency} 
          onChange={handleCurrencyChange}
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <TextField 
            label="Target currency" 
            select 
            value={targetCurrency} 
            onChange={handleTargetCurrencyChange}
            helperText="Please select your target currency"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
        <TextField label="Result" />
      </div>
    </form>
  )
};

export default Converter;