import { converterApiURL, converterApiKey } from './../../config/api';

const fetchCurrencies = async () => {
  const response = await fetch(`${converterApiURL}currencies?apiKey=${converterApiKey}`, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await response.json()
};

export default fetchCurrencies;