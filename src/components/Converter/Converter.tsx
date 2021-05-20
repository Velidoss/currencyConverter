import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Typography, Container } from '@material-ui/core';
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
import styles from './ConverterStyles';
import ConverterLoader from './ConverterLoader/ConverterLoader';
import converterContants from './../../config/converterConstants';

const {STATUS_LOADING, STATUS_READY, STATUS_ERROR} = converterContants; 

const Converter: React.FC = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const {currenciesRate, currencies, exchangeRate, status}: IConverterState = useAppSelector(state => state.converter);
  const [amount, setAmount] = useState<string>('0');
  const [result, setResult] = useState<string>('0');
  const [currentCurrency, setCurrentCurrency] = useState<string>('UAH');
  const [targetCurrency, setTargetCurrency] = useState<string>('USD');

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    putInLocalStorage({
      amount: newAmount, result, currentCurrency, targetCurrency,
    });
  }

  const handleCurrencyChange = useCallback(
    (newCurrency: string) => {
    setCurrentCurrency(newCurrency);
    putInLocalStorage({
      amount, result, currentCurrency: newCurrency, targetCurrency,
    })}, [amount, result, targetCurrency]);

  const handleTargetCurrencyChange = useCallback(
    (newTargetCurrency: string) => {
    setTargetCurrency(newTargetCurrency);
    putInLocalStorage({
      amount, result, currentCurrency, targetCurrency: newTargetCurrency,
    })}, [amount, result, currentCurrency]);

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
  console.log('render', status);

  return (
    <Grid container item >
      {
        status === STATUS_LOADING && <ConverterLoader />
      }
      {
        // status === STATUS_ERROR && <ConverterLoader error={true} />
      }
      <Grid item xs={12}>
        <Container maxWidth="sm">
          <form className={classes.form} onSubmit={handleFormSubmit}>
            <Grid container >
              <Grid 
                className={classes.gridItem} 
                item 
                container 
                xs={12} 
                justify="center"
              >
                <Grid item container justify="center" sm={6}>
                  <TextField 
                    label="Amount"
                    variant="outlined"
                    type="number" 
                    value={amount} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAmountChange(event.target.value)}
                  />  
                </Grid>
                <Grid item container justify="center" sm={6} className={classes.currentCurrency}>
                  <CurrencyField 
                    label={"Current currency"}
                    currencyValue={currentCurrency}
                    onChangeCallBack={handleCurrencyChange}
                    currencies={currencies}
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid xs={6}>
                  <Grid className={classes.gridItem} item container xs={12} justify="center">
                    <CurrencyField 
                      label={"Target currency"}
                      currencyValue={targetCurrency}
                      onChangeCallBack={handleTargetCurrencyChange}
                      currencies={currencies}
                    />
                  </Grid>
                  <Grid className={classes.gridItem} item container xs={12} justify="center">
                    <Button  type="submit" variant="outlined" color="primary" >
                      <Typography variant="subtitle1">
                        Convert
                      </Typography>
                    </Button>
                  </Grid>                  
                  <Grid className={classes.gridItem} item container xs={12} justify="center">
                    <TextField label="Result" value={result} variant="outlined" /> 
                  </Grid>
                </Grid>
                <Grid xs={6}>
                  <CurrenciesRate 
                    currentCurrency={currentCurrency}
                    currenciesRate={currenciesRate} 
                  />
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Grid>

    </Grid>
    
  )
};

export default Converter;