// @flow
import React from 'react';
import _ from 'lodash';
import withRoot from 'src/share/enhancer/withRoot';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Toolbar from 'material-ui/Toolbar';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import SettingsIcon from 'material-ui-icons/Settings';
import BugReportIcon from 'material-ui-icons/BugReport';
import FeedbackIcon from 'material-ui-icons/Feedback';
import InfoIcon from 'material-ui-icons/Info';
import FolderIcon from 'material-ui-icons/Folder';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import TextConstants from 'src/share/constant/textConstants';
import BottomNavigation, {BottomNavigationAction} from 'material-ui/BottomNavigation';
import {mapMenuIndexToURL} from 'src/share/util/frameContainerUtils';

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void,
    push: (string) => void
};

const drawerWidth = 240;

const styles = theme => ({
    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        display: 'flex'
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    contentContainer: {
        flexGrow: 1,
        marginTop: 60,
        backgroundColor: theme.palette.background.default,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    contentContainerShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    bottomBarContainer: {
        position: 'absolute',
        bottom: '0%',
        width: '100%',
        display: 'flex'

    },
    bottomBar: {
        alignSelf: 'flex-end',
        flexGrow: 1
    }
});

class FrameContainer extends React.Component<Props> {

    _onBottomNavClick = (event, index) => {
        const {handleBottomNavClick, push} = this.props;
        handleBottomNavClick(index);
        push(mapMenuIndexToURL(index));
    };

    render() {
        const {classes, menuStatus, bottomNavCheckedIndex, toggleMenuStatus} = this.props;

        return (
            <div className={classes.appFrame}>
                <AppBar
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: menuStatus,
                    })}
                >
                    <Toolbar disableGutters>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            onClick={toggleMenuStatus}
                            className={classes.menuButton}
                        >
                            {menuStatus ? <ArrowBackIcon/> : <MenuIcon/>}
                        </IconButton>
                        <Typography variant='title' color='inherit' noWrap>
                            {TextConstants.TITLE_HOME}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.bottomBarContainer}>
                    <BottomNavigation
                        value={bottomNavCheckedIndex}
                        className={classes.bottomBar}
                        onChange={this._onBottomNavClick}
                        showLabels
                    >
                        <BottomNavigationAction label={TextConstants.FileFolder} icon={<FolderIcon/>}/>
                        <BottomNavigationAction label={TextConstants.AUTO} icon={<BugReportIcon/>}/>
                        <BottomNavigationAction label={TextConstants.PROFILE} icon={<AccountCircleIcon/>}/>
                    </BottomNavigation>
                </div>
                <Drawer
                    anchor='left'
                    open={menuStatus}
                    classes={{paper: classes.drawerPaper}}
                    onClose={toggleMenuStatus}
                >
                    <Divider/>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.PROFILE}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <BugReportIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.AUTO}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <FolderIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.FileFolder}/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <SettingsIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.SETTINGS}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <FeedbackIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.FEEDBACK}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <InfoIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.ABOUT}/>
                        </ListItem>
                    </List>
                </Drawer>
                <div
                    className={classNames(classes.contentContainer, {
                        [classes.contentContainerShift]: menuStatus,
                    })}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default _.flowRight(
    withRoot,
    withStyles(styles)
)(FrameContainer);