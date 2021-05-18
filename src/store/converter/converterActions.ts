import ICurrency from '../../interfaces/ICurrency';
import { AppThunk } from '../store';
import { converterApiURL, converterApiKey } from './../../config/api';
import { SET_CURRENCIES, SET_CURRENCIES_RATE, SET_EXCHANGE_RATE } from './converterActionTypes';

const setCurrencies = (currencies: {[key: string]: ICurrency}) => ({
  type: SET_CURRENCIES,
  payload: currencies.results,
});

const setExchangeRate = (exchangeRate: number) => ({
  type: SET_EXCHANGE_RATE,
  payload: exchangeRate,
});

const setCurrenciesRate = (currenciesRate: any) => ({
  type: SET_CURRENCIES_RATE,
  payload: currenciesRate,
});

export const getCurrencies = 
(): AppThunk =>
 async (dispatch) => {
  const response = await fetch(`${converterApiURL}currencies?apiKey=${converterApiKey}`, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  dispatch(setCurrencies(await response.json()));
};

export const getExchangerate = 
(currentCurrencyId: string, targetCurrencyId: string): AppThunk =>
  async (dispatch) => {
    const response = await fetch(
      `${converterApiURL}convert?apiKey=${converterApiKey}&q=${currentCurrencyId}_${targetCurrencyId}&compact=ultra`, 
      {
        method: 'get',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
    });
    dispatch(setExchangeRate(await response.json()));
  };

export const getCurrenciesRate = 
  (currentCurrencyId: string): AppThunk =>
    async (dispatch) => {
      const urls = ['',''];
      const majorCurrencies = ['UAH', 'USD', 'EUR', 'GBP'].filter((currency) => currency !== currentCurrencyId);
      urls[0] = `${converterApiURL}convert?apiKey=${converterApiKey}&q=${majorCurrencies[0]}_${currentCurrencyId},${majorCurrencies[1]}_${currentCurrencyId}&compact=ultra`
      urls[1] = `${converterApiURL}convert?apiKey=${converterApiKey}&q=${majorCurrencies[2]}_${currentCurrencyId}${majorCurrencies[3] ? `,${majorCurrencies[3]}_${currentCurrencyId}` : ''}&compact=ultra`
      const response1 = await fetch(
        urls[0], 
        {
          method: 'get',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
      });
      const response2 = await fetch(
        urls[1], 
        {
          method: 'get',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
      });
      const [result1, result2] = await Promise.all([response1, response2]);
      const part1 = await result1.json();
      const part2 = await result2.json();
      dispatch(setCurrenciesRate({...part1, ...part2}));
    };