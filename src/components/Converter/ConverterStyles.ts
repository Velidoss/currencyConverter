import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const ConverterStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    background: 'rgba(73, 127, 227, 1)',
  },
  form: {
    background: 'white',
    borderRadius: 20,
  },
  formFields: {
    position: 'relative',
    borderRadius: 20,
  },
  gridItem: {
    marginTop: 20,
    marginBottom: 20,
  },
  gridAmountField: {
    width: 210,
  },
  currentCurrency: {
    [theme.breakpoints.down('xs')]: { marginTop: 20 },
  }
}))

export default ConverterStyles;