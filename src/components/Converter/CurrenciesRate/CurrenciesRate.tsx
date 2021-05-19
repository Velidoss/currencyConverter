import { Grid, List, ListItem, ListSubheader } from "@material-ui/core";
import { ICurrencyRateToShow } from './../../../interfaces/ICurrencyRateToShow';
import style from './CurrenciesRateStyles';

interface CurrenciesRateProps {
  currenciesRate: ICurrencyRateToShow[];
  currentCurrency: string;
}

const CurrenciesRate: React.FC<CurrenciesRateProps> = ({currenciesRate, currentCurrency}) => {
  const classes = style();
  return (
    <Grid container justify="center">
      <List 
        className={classes.list}
        component="div"
        subheader={
          <ListSubheader component="div" >
            Currencies rate
          </ListSubheader>
        }
      >
        {
          currenciesRate.map((currency) => (
            <ListItem key={currency.id}>
              {`1 ${currency.id} = ${(currency.exchangeRate).toFixed(2)} ${currentCurrency}`}
            </ListItem>
          ))
        }

      </List>
    </Grid>

    );
};

export default CurrenciesRate;