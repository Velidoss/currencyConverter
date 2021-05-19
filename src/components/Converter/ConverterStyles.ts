import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const ConverterStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    background: 'rgba(73, 127, 227, 1)',
  },
  amountField: {
    marginRight: 20,
  },
  currencyField: {
    marginLeft: 20,
  }
}))

export default ConverterStyles;