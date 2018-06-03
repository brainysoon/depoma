// @flow
import React from 'react';
import _ from 'lodash';
import withRoot from 'src/share/enhancer/withRoot';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import BugReportIcon from '@material-ui/icons/BugReport';
import FeedbackIcon from '@material-ui/icons/Feedback';
import InfoIcon from '@material-ui/icons/Info';
import DescriptionIcon from '@material-ui/icons/Description';
import ListIcon from '@material-ui/icons/List';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextConstants from 'src/share/constant/textConstants';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {mapMenuIndexToURL} from 'src/share/util/frameContainerUtils';
import URIConstants from 'src/share/constant/uriConstants';

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
        position: 'fixed',
        top: 0,
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
        zIndex: 100,
        position: 'fixed',
        bottom: '0',
        width: '100%',
        display: 'flex'

    },
    bottomBar: {
        alignSelf: 'flex-end',
        flexGrow: 1
    }
});

class FrameContainer extends React.Component<Props> {

    onBottomNavClick = (event, index) => {
        const {handleBottomNavClick, push} = this.props;
        handleBottomNavClick(index);
        push(mapMenuIndexToURL(index));
    };

    onSideBarItemClick = (url, index) => {
        const {push, toggleMenuStatus, handleBottomNavClick} = this.props;
        return () => {
            toggleMenuStatus();
            push(url);
            handleBottomNavClick(index);
        };
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
                <Drawer
                    anchor='left'
                    open={menuStatus}
                    classes={{paper: classes.drawerPaper}}
                    onClose={toggleMenuStatus}
                >
                    <Divider/>
                    <List>
                        <ListItem onClick={this.onSideBarItemClick(URIConstants.PROFILE, 0)} button>
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.PROFILE}/>
                        </ListItem>
                        <ListItem onClick={this.onSideBarItemClick(URIConstants.ROBOT, 2)} button>
                            <ListItemIcon>
                                <BugReportIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.AUTO}/>
                        </ListItem>
                        <ListItem onClick={this.onSideBarItemClick(URIConstants.CONTENT, 1)} button>
                            <ListItemIcon>
                                <DescriptionIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.CONTENT}/>
                        </ListItem>
                        <ListItem onClick={this.onSideBarItemClick(URIConstants.LOG, 3)} button>
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.LOG}/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem onClick={this.onSideBarItemClick(URIConstants.SETTING, 0)} button>
                            <ListItemIcon>
                                <SettingsIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.SETTINGS}/>
                        </ListItem>
                        <ListItem onClick={this.onSideBarItemClick(URIConstants.FEEDBACK, 0)} button>
                            <ListItemIcon>
                                <FeedbackIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.FEEDBACK}/>
                        </ListItem>
                        <ListItem onClick={this.onSideBarItemClick(URIConstants.ABOUT, 0)} button>
                            <ListItemIcon>
                                <InfoIcon/>
                            </ListItemIcon>
                            <ListItemText primary={TextConstants.ABOUT}/>
                        </ListItem>
                    </List>
                </Drawer>
                <div className={classes.bottomBarContainer}>
                    <BottomNavigation
                        value={bottomNavCheckedIndex}
                        className={classes.bottomBar}
                        onChange={this.onBottomNavClick}
                        showLabels
                    >
                        <BottomNavigationAction label={TextConstants.PROFILE} icon={<AccountCircleIcon/>}/>
                        <BottomNavigationAction label={TextConstants.CONTENT} icon={<DescriptionIcon/>}/>
                        <BottomNavigationAction label={TextConstants.AUTO} icon={<BugReportIcon/>}/>
                        <BottomNavigationAction label={TextConstants.LOG} icon={<ListIcon/>}/>
                    </BottomNavigation>
                </div>
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