// @flow
import React from 'react';
import _ from 'lodash';
import withRoot from 'src/share/withRoot';
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
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

type Props = {
    isDrawerOpen: boolean
};


export const mailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Inbox"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="Starred"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SendIcon/>
            </ListItemIcon>
            <ListItemText primary="Send mail"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DraftsIcon/>
            </ListItemIcon>
            <ListItemText primary="Drafts"/>
        </ListItem>
    </div>
);

export const otherMailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <MailIcon/>
            </ListItemIcon>
            <ListItemText primary="All mail"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DeleteIcon/>
            </ListItemIcon>
            <ListItemText primary="Trash"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ReportIcon/>
            </ListItemIcon>
            <ListItemText primary="Spam"/>
        </ListItem>
    </div>
);

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
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
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
});

class Home extends React.Component<Props> {
    state = {
        open: false,
        anchor: 'left',
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes, theme} = this.props;
        const {anchor, open} = this.state;

        return (
            <div className={classes.appFrame}>
                <AppBar
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                        [classes[`appBarShift-${anchor}`]]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            Persistent drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    anchor={anchor}
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>{mailFolderListItems}</List>
                    <Divider/>
                    <List>{otherMailFolderListItems}</List>
                </Drawer>
                <main
                    className={classNames(classes.content, classes[`content-${anchor}`], {
                        [classes.contentShift]: open,
                        [classes[`contentShift-${anchor}`]]: open,
                    })}
                >
                    <div className={classes.drawerHeader}/>
                    <Typography>{'You think water moves fast? You should see ice.'}</Typography>
                </main>
            </div>
        );
    }
}

export default _.flowRight(
    withRoot,
    withStyles(styles, {withTheme: true})
)(Home);