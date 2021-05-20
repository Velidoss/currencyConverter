import { converterApiURL, converterApiKey } from '../../config/api';

const fetchCurrenciesRate = async (currentCurrencyId: string) => {
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
        return {...part1, ...part2};
};

export default fetchCurrenciesRate;