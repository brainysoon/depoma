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
import List from 'material-ui/List';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
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


type Props = {};

const drawerWidth = 240;

const styles = theme => ({
    appFrame: {
        zIndex: 1,
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
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
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        display: 'flex'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    bottomBar: {
        flexGrow: 1,
        alignSelf: 'flex-end',
        marginLeft: drawerWidth,
    }
});

class RobotPage extends React.Component<Props> {
    state = {
        open: false,
        anchor: 'left',
    };

    toggleOpenState = () => {

        this.setState({open: !this.state.open})
    };

    handleBottomBarClick = (event, value) => {

        this.setState({barIndex: value});
    };

    render() {
        const {classes} = this.props;
        const {anchor, open, barIndex} = this.state;

        return (
            <div className={classes.appFrame}>
                <AppBar
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.toggleOpenState}
                            className={classes.menuButton}
                        >
                            {open ? <ArrowBackIcon/> : <MenuIcon/>}
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            {TextConstants.TITLE_HOME}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="temporary"
                    anchor={anchor}
                    open={open}
                    classes={{paper: classes.drawerPaper}}
                    onClose={this.toggleOpenState}
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
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <BottomNavigation
                        value={barIndex}
                        className={classes.bottomBar}
                        onChange={this.handleBottomBarClick}
                        showLabels
                    >
                        <BottomNavigationAction label={TextConstants.FileFolder} icon={<FolderIcon/>}/>
                        <BottomNavigationAction label={TextConstants.AUTO} icon={<BugReportIcon/>}/>
                        <BottomNavigationAction label={TextConstants.PROFILE} icon={<AccountCircleIcon/>}/>
                    </BottomNavigation>
                </div>
            </div>
        );
    }
}

export default _.flowRight(
    withRoot,
    withStyles(styles)
)(RobotPage);