import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import withRoot from 'src/share/withRoot';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

const styles = {};

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {open: false}
    }

    render() {

        const {open} = this.state;

        return <AppBar>
            <ToolBar>
                <IconButton>
                    <MenuIcon open={open}/>
                </IconButton>
                <Typography>
                    首页
                </Typography>
            </ToolBar>
        </AppBar>;
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default _.flowRight(
    withRoot,
    withStyles(styles)
)(Home);