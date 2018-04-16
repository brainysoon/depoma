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
import TextConstants from 'src/share/constant/TextConstants';

type Props = {};

const drawerWidth = 240;

const styles = theme => ({
    appFrame: {
        zIndex: 1,
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
        position: 'relative',
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

class Home extends React.Component<Props> {
    state = {
        open: false,
        anchor: 'left',
    };

    toggleOpenState = () => {

        this.setState({open: !this.state.open})
    };

    render() {
        const {classes} = this.props;
        const {anchor, open} = this.state;

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
                    variant="persistent"
                    anchor={anchor}
                    open={open}
                    classes={{paper: classes.drawerPaper}}
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
                </div>
            </div>
        );
    }
}

export default _.flowRight(
    withRoot,
    withStyles(styles)
)(Home);