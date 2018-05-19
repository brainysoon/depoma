import React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/lightGreen';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: green[400],
            main: green[600],
            dark: green[800],
            contrastText: '#fff',
        },
        secondary: {
            light: yellow[400],
            main: yellow[600],
            dark: yellow[800],
            contrastText: '#000',
        },
    },
});

function withRoot(Component) {
    function WithRoot(props) {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...props} />
            </MuiThemeProvider>
        );
    }

    return WithRoot;
}

export default withRoot;
