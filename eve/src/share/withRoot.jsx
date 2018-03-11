import React from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import green from 'material-ui/colors/green';
import lightGreen from 'material-ui/colors/lightGreen';
import Reboot from 'material-ui/Reboot';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: green[300],
            main: green[500],
            dark: green[700],
        },
        secondary: {
            light: lightGreen[300],
            main: lightGreen[500],
            dark: lightGreen[700],
        },
    },
});

function withRoot(Component) {
    function WithRoot(props) {
        return (
            <MuiThemeProvider theme={theme}>
                <Reboot/>
                <Component {...props} />
            </MuiThemeProvider>
        );
    }

    return WithRoot;
}

export default withRoot;
