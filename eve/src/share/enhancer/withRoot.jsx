import React from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/lightGreen';
import CssBaseline from 'material-ui/CssBaseline';

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
