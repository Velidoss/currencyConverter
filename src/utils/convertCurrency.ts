const convertCurrency = (exchangeRate: number, currentCurrencyAmount: number) => {
  return (currentCurrencyAmount * Object.values(exchangeRate)[0]);
};

export default convertCurrency;