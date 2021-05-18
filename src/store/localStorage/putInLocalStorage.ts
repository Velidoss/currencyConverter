import IConverterDataForLocalStorage from './../../interfaces/IConverterDataForLocalStorage';

const putInLocalStorage = (converterData: IConverterDataForLocalStorage): void => {
  localStorage.setItem('converterData', JSON.stringify(converterData));
};

export default putInLocalStorage;