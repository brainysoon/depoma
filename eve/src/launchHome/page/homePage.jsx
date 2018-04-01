import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import withRoot from 'src/share/withRoot';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import {withStyles} from 'material-ui/styles';
import {COLOR_INHERIT} from 'src/share/util/constant/constants';

const styles = {};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false}
    }

    _handleMenuClick = () => {
        this.setState({open: !this.state.open})
    }

    render() {
        const {open} = this.state;

        return <div>
            <AppBar>
                <ToolBar>
                    <IconButton color={COLOR_INHERIT}>
                        <MenuIcon open={open} onClick={this._handleMenuClick}/>
                    </IconButton>
                    <Typography color={COLOR_INHERIT}>
                        首页
                    </Typography>
                </ToolBar>
            </AppBar>
            <Drawer anchor='left' open={open}>
                <div>
                    <List>Brainy Soon</List>
                    <Divider/>
                    <List>Guo Ting</List>
                </div>
            </Drawer>
        </div>;
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default _.flowRight(
    withRoot,
    withStyles(styles)
)(Home);