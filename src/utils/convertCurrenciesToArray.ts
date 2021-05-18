import ICurrency from "../interfaces/ICurrency";

const convertCurrenciesToArray = (currencies: {[key: string]: ICurrency}): ICurrency[] => {
  return Object.keys(currencies).map((currency) => ({
    id: currencies[currency].id,
    currencyName: currencies[currency].currencyName,
    currencySymbol: currencies[currency].currencySymbol,
  })).sort((prev, current) => {
    if (prev.id < current.id) {
      return -1;
    }
    if (prev.id > current.id) {
      return 1;
    }
    return 0;
  })
};

export default convertCurrenciesToArray;