import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, MenuItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getCurrencies, getExchangerate } from '../../store/converter/converterActions';
import { useAppSelector } from '../../store/hooks';
import convertCurrency from './../../utils/convertCurrency';
import { getCurrenciesRate } from './../../store/converter/converterActions';
import CurrenciesRate from './CurrenciesRate/CurrenciesRate';
import IConverterState from './../../interfaces/IConverterState';
import getDataFromLocalStorage from './../../store/localStorage/getDataFromLocalStorage';
import putInLocalStorage from './../../store/localStorage/putInLocalStorage';
import CurrencyField from './CurrencyField/CurrencyField';

const Converter: React.FC = () => {
  const dispatch = useDispatch();
  const {currenciesRate, currencies, exchangeRate}: IConverterState = useAppSelector(state => state.converter);
  const [amount, setAmount] = useState<string>('0');
  const [result, setResult] = useState<string>('0');
  const [currentCurrency, setCurrentCurrency] = useState<string>('UAH');
  const [targetCurrency, setTargetCurrency] = useState<string>('USD');

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    putInLocalStorage({
      amount: event.target.value, result, currentCurrency, targetCurrency,
    });
  }

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCurrency(event.target.value);
    putInLocalStorage({
      amount, result, currentCurrency: event.target.value, targetCurrency,
    });
  }
  const handleTargetCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetCurrency(event.target.value);
    putInLocalStorage({
      amount, result, currentCurrency, targetCurrency: event.target.value,
    });
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const convertedResult = convertCurrency(exchangeRate, (parseFloat(amount))).toString();
    setResult(convertedResult);
    putInLocalStorage({
      amount, result: convertedResult, currentCurrency, targetCurrency,
    });
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
  }, []);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <TextField label="Amount" type="number" value={amount} onChange={handleAmountChange} />        
          <CurrencyField 
            label={"Current currency"}
            currencyValue={currentCurrency}
            onChangeCallBack={handleCurrencyChange}
            currencies={currencies}
          />
        </div>
        <div>
          <CurrencyField 
            label={"Target currency"}
            currencyValue={targetCurrency}
            onChangeCallBack={handleTargetCurrencyChange}
            currencies={currencies}
          />
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