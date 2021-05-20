import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const CurrencyRateStyles = makeStyles((theme: Theme) => createStyles({
    list: {
      marginTop: 30,
      background: 'rgba(72, 111, 240, 0.9)',
      borderRadius: 20,
      color: 'rgb(223, 228, 255)',
    },
    listHeader: {
      borderRadius: 20,
      background: 'rgba(72, 111, 240, 0.9)',
      color: 'rgb(223, 228, 255)',
    }
  }
  )
)

export default CurrencyRateStyles;