import ICurrency from '../../interfaces/ICurrency';
import { AppThunk } from '../store';
import { converterApiURL, converterApiKey } from './../../config/api';
import { SET_CURRENCIES } from './converterActionTypes';

const setCurrencies = (currencies: {[key: string]: ICurrency}) => ({
  type: SET_CURRENCIES,
  payload: currencies.results,
})

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
}