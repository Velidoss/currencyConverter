import IConverterDataForLocalStorage from './../../interfaces/IConverterDataForLocalStorage';

const getDataFromLocalStorage = (): IConverterDataForLocalStorage | string => {
  const converterData = localStorage.getItem('converterData');
  if (converterData) {
    return JSON.parse(converterData);
  }
  return '';
};

export default getDataFromLocalStorage;