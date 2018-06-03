// @flow
import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import FrameContainer from 'src/share/component/frameContainer';
import {withStyles} from "@material-ui/core/styles/index";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import CloudIcon from '@material-ui/icons/Cloud';
import TextConstants from 'src/share/constant/textConstants';
import {handleBottomNavClick, toggleMenuStatus, toggleSetting} from 'src/share/action/sharedActions';
import {SETTING_TOGGLE_PRODUCTION} from 'src/share/constant/configConstants';

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void,
    push: (string) => void,
    toggles: Array<*>,
    toggleSetting: (string, string) => void
};


const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 40,
        backgroundColor: theme.palette.background.paper,
    },
    setting: {
        width: '100%'
    }
});

class SettingPage extends React.Component<Props> {

    onSwitchChange = (toggleKey) => {
        const {toggleSetting} = this.props;
        return (event) => {
            const toggleState = event.target.checked;
            toggleSetting(toggleKey, toggleState);
        }
    };

    render() {
        const {classes, toggles, ...frameContainerProps} = this.props;

        return (
            <FrameContainer {...frameContainerProps}>
                <div className={classes.root}>
                    <List className={classes.setting}
                          subheader={<ListSubheader>{TextConstants.SETTINGS}</ListSubheader>}>
                        <ListItem>
                            <ListItemIcon>
                                <CloudIcon/>
                            </ListItemIcon>
                            <ListItemText primary="生产环境"/>
                            <ListItemSecondaryAction>
                                <Switch
                                    onChange={this.onSwitchChange(SETTING_TOGGLE_PRODUCTION)}
                                    checked={!!_.get(toggles, SETTING_TOGGLE_PRODUCTION)}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </div>
            </FrameContainer>);
    }
}

const mapStateToProps = (state) => {
    return {
        menuStatus: state.app.menuStatus,
        bottomNavCheckedIndex: state.app.bottomNavCheckedIndex,
        toggles: state.app.toggles
    }
};

const mapDispatchToProps = {
    toggleMenuStatus: toggleMenuStatus,
    handleBottomNavClick: handleBottomNavClick,
    push: push,
    toggleSetting: toggleSetting
};

const enhancer = _.flowRight(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhancer(SettingPage);