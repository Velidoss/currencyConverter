import { ICurrencyRateToShow } from './ICurrencyRateToShow';

export default interface IConverterState {
  status: string;
  exchangeRate: number;
  currencies: any;
  currenciesRate: ICurrencyRateToShow[];
  currenciesRateStatus: string;
}