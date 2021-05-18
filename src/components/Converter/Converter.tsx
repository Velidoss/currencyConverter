import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getCurrencies } from '../../store/converter/converterActions';
import { useAppSelector } from '../../store/hooks';
import ICurrency from './../../interfaces/ICurrency';

const Converter: React.FC = () => {
  const dispatch = useDispatch();
  const currencies = useAppSelector(state => state.converter.currencies);
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

  console.log(currencies);

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

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
          {currencies.map((currency: ICurrency) => (
            <MenuItem defaultValue="USD" key={currency.id} value={currency.id}>
              {`${currency.id} - ${currency.currencyName}`}
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
            {currencies.map((currency: ICurrency) => (
              <MenuItem defaultValue="ALL" key={currency.id} value={currency.id}>
                {`${currency.id} - ${currency.currencyName}`}
              </MenuItem>
            ))}
        </TextField>
        <TextField label="Result" />
      </div>
    </form>
  )
};

export default Converter;