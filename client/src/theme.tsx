import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'QuickSand',
    },
    palette: {
        primary: {
            main: '#9D504B',
            light: '#EBC8BD'
        },
        secondary: {
            main: '#B8C3CC',
            light: '#DBE1E5',
            dark: '#A1B7CA',
        },
        error: {
            main: '#A42121',
        },
        warning: {
            main: '#F6AE2D',
        },
        info: {
            main: '#B8645E',
        },
        success: {
            main: '#43997F',
        },
        text: {
            primary: '#2E2E2E',
            secondary: '#A5ABB0',
            disabled: '#CBCED0'
        },
        divider: '#EBC8BD',
    },
});

export default theme;