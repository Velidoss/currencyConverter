import ICurrencyRate from './../interfaces/ICurrencyRate';
import { ICurrencyRateToShow } from './../interfaces/ICurrencyRateToShow';

const convertCurrencyRates = (currencyRates: ICurrencyRate): ICurrencyRateToShow[] => {
  return Object.keys(currencyRates).map((currency) => ({
    id: currency.split('_')[0],
    exchangeRate: currencyRates[currency],
  })).sort((prev, current) => {
    if (prev.id < current.id) {
      return -1;
    }
    if (prev.id > current.id) {
      return 1;
    }
    return 0;
  });
};

export default convertCurrencyRates;