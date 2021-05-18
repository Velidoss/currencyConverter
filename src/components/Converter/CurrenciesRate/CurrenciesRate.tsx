import { List, ListItem } from "@material-ui/core";
import { ICurrencyRateToShow } from './../../../interfaces/ICurrencyRateToShow';

interface CurrenciesRateProps {
  currenciesRate: ICurrencyRateToShow[];
  currentCurrency: string;
}

const CurrenciesRate: React.FC<CurrenciesRateProps> = ({currenciesRate, currentCurrency}) => {

  return (
    <List >
      {
        currenciesRate.map((currency) => (
          <ListItem key={currency.id}>
            {`1 ${currency.id} = ${(currency.exchangeRate).toFixed(2)} ${currentCurrency}`}
          </ListItem>
        ))
      }

    </List>
    );
};

export default CurrenciesRate;