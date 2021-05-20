import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const ConverterLoaderStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      height: '100%',
      width: '100%',
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.9)',
      position: 'absolute',
      top:0,
      left: 0,
      borderRadius: 20,
    },
    progress: {
      marginTop:20,
    }
  }
  )
)

export default ConverterLoaderStyles;