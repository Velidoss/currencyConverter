import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, MenuItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getCurrencies, getExchangerate } from '../../store/converter/converterActions';
import { useAppSelector } from '../../store/hooks';
import ICurrency from './../../interfaces/ICurrency';
import convertCurrency from './../../utils/convertCurrency';
import { getCurrenciesRate } from './../../store/converter/converterActions';
import CurrenciesRate from './CurrenciesRate/CurrenciesRate';
import IConverterState from './../../interfaces/IConverterState';
import getDataFromLocalStorage from './../../store/localStorage/getDataFromLocalStorage';
import putInLocalStorage from './../../store/localStorage/putInLocalStorage';

const Converter: React.FC = () => {
  const dispatch = useDispatch();
  const {currenciesRate, currencies, exchangeRate}: IConverterState = useAppSelector(state => state.converter);
  const [amount, setAmount] = useState<string>('0');
  const [result, setResult] = useState<string>('0');
  const [currentCurrency, setCurrentCurrency] = useState<string>('UAH');
  const [targetCurrency, setTargetCurrency] = useState<string>('USD');

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  }

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCurrency(event.target.value);
  }
  const handleTargetCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetCurrency(event.target.value);
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult((convertCurrency(exchangeRate, (parseFloat(amount))).toString()));
  }

  useEffect(() => {
    dispatch(getExchangerate(currentCurrency, targetCurrency));
  }, [currentCurrency, targetCurrency, dispatch]);

  useEffect(() => {
    dispatch(getCurrenciesRate(currentCurrency));
  }, [currentCurrency, dispatch]);

  useEffect(() => {
    const storedData = getDataFromLocalStorage();
    console.log(storedData)
    if (typeof storedData !== 'string') {
      setAmount(storedData.amount || '0');
      setResult(storedData.result || '0');
      setCurrentCurrency(storedData.currentCurrency || 'UAH');
      setTargetCurrency(storedData.targetCurrency || 'USD');
    }
    dispatch(getCurrencies());
    return () => {
      alert('got into LS');
      putInLocalStorage({
        amount, result, currentCurrency, targetCurrency,
      });
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
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
                <MenuItem defaultValue="UAH" key={currency.id} value={currency.id}>
                  {`${currency.id} - ${currency.currencyName}`}
                </MenuItem>
              ))}
          </TextField>
          <TextField label="Result" value={result} />
        </div>
        <Button  type="submit" variant="outlined" color="primary" >
          Evaluate
        </Button>
      </form>
      <CurrenciesRate 
        currentCurrency={currentCurrency}
        currenciesRate={currenciesRate} 
      />
    </div>
    
  )
};

export default Converter;