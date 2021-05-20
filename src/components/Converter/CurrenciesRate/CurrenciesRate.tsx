import { CircularProgress, Grid, List, ListItem, ListSubheader, Typography } from "@material-ui/core";
import { ICurrencyRateToShow } from './../../../interfaces/ICurrencyRateToShow';
import style from './CurrenciesRateStyles';
import IConverterState from './../../../interfaces/IConverterState';
import { useAppSelector } from "../../../store/hooks";
import converterContants from './../../../config/converterConstants';

interface CurrenciesRateProps {
  currenciesRate: ICurrencyRateToShow[];
  currentCurrency: string;
}

const CurrenciesRate: React.FC<CurrenciesRateProps> = ({currenciesRate, currentCurrency}) => {
  const {STATUS_ERROR, STATUS_READY} = converterContants; 
  const {currenciesRateStatus}: IConverterState = useAppSelector(state => state.converter);
  const classes = style();
  console.log('render currency field');
  return (
    <Grid container justify="center">
      {
        currenciesRateStatus === STATUS_READY 
        ? (
          <List 
            className={classes.list}
            component="div"
            subheader={
              <ListSubheader component="div" className={classes.listHeader} >
                Currencies rate
              </ListSubheader>
            }
          >
            {
              currenciesRate.map((currency) => (
                <ListItem key={currency.id}>
                  <Typography>
                    {`1 ${currency.id} = ${(currency.exchangeRate).toFixed(2)} ${currentCurrency}`}
                  </Typography>
                </ListItem>
              ))
            }
          </List>
        )
        : <CircularProgress />
      }
    </Grid>
  );
};

export default CurrenciesRate;