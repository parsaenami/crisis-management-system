import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { responsiveFontSizes } from "@material-ui/core/styles";

/**
 * A global theme for the app
 * @type {Theme}
 */
let Theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#140053',
      light: '#91DDEC',
    },
    secondary: {
      main: '#F5F2EB',
      light: '#FDFFFA',
    },
    info: {
      main: '#B8F4EC',
    },
    text: {
      primary: '#140053',
      secondary: '#4D4D4D',
      disabled: '#A5A5A5',
      hint: '#A5A5A5',
      light: '#707070',
    },
    background: {
      default: '#F5F2EB',
      // default: window.location.pathname === routes.HOME ? '#91DDEC' : '#F5F2EB',
    },
  },
});
console.log(window.location.pathname)
Theme = responsiveFontSizes(Theme);

export default Theme;