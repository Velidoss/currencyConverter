import { converterApiURL, converterApiKey } from '../../config/api';

const fetchExchangerates = async (currentCurrencyId: string, targetCurrencyId: string) => {
  const response = await fetch(
    `${converterApiURL}convert?apiKey=${converterApiKey}&q=${currentCurrencyId}_${targetCurrencyId}&compact=ultra`, 
      {
        method: 'get',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
    });
  return await response.json()
};

export default fetchExchangerates;