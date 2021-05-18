import IConverterDataForLocalStorage from './../../interfaces/IConverterDataForLocalStorage';

const getDataFromLocalStorage = (): IConverterDataForLocalStorage | string => {
  const converterData = localStorage.getItem('converterData') || '';
  return JSON.parse(converterData);
};

export default getDataFromLocalStorage;