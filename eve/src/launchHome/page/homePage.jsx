import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import withRoot from 'src/share/withRoot';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import {COLOR_INHERIT} from 'src/share/util/constant/constants';

const styles = {};

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {open: true}
    }

    render() {

        const {open} = this.state;

        return <AppBar>
            <ToolBar>
                <IconButton color={COLOR_INHERIT}>
                    <MenuIcon open={open}/>
                </IconButton>
                <Typography color={COLOR_INHERIT}>
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