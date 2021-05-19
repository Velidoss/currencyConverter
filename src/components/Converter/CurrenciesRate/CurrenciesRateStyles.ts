import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const CurrencyRateStyles = makeStyles((theme: Theme) => createStyles({
    list: {
      marginTop: 30,
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 20,
    },
    listHeader: {
      borderRadius: 20,
    }
  }
  )
)

export default CurrencyRateStyles;