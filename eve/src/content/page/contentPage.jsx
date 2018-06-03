// @flow
import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import FrameContainer from 'src/share/component/frameContainer';
import {toggleMenuStatus, handleBottomNavClick} from 'src/share/action/sharedActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from "@material-ui/core/styles/index";
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import UploadContentDialog from 'src/content/component/uploadContentDialog';

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void,
    push: (string) => void
};


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 10,
        right: theme.spacing.unit * 3,
    },
});

class ContentPage extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = {showAddDialog: false}
    }

    onAddContentButtonClick = () => {
        console.log('here')
        this.setState({showAddDialog: true})
    };

    render() {
        const {classes, ...frameContainerProps} = this.props;
        const {showAddDialog} = this.state;

        return (
            <FrameContainer {...frameContainerProps}>
                <div className={classes.root}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="好友常用聊天5" secondary="2018-05-16 11:11 01"/>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="好友常用聊天4" secondary="2018-05-16 09:19 05"/>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="好友常用聊天3" secondary="2018-05-16 01:19 10"/>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="好友常用聊天2" secondary="2018-05-16 08:14 19"/>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="好友常用聊天1" secondary="2018-05-16 10:19 11"/>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                    </List>
                    <Tooltip title="FAB 'position: absolute;'">
                        <Button variant="fab" color="primary" className={classes.absolute}
                                onClick={this.onAddContentButtonClick}>
                            <AddIcon/>
                        </Button>
                    </Tooltip>
                    <UploadContentDialog showAddDialog={showAddDialog}/>
                </div>
            </FrameContainer>);
    }
}

const mapStateToProps = (state) => {
    return {
        menuStatus: state.app.menuStatus,
        bottomNavCheckedIndex: state.app.bottomNavCheckedIndex
    }
};

const mapDispatchToProps = {
    toggleMenuStatus: toggleMenuStatus,
    handleBottomNavClick: handleBottomNavClick,
    push: push
};

const enhancer = _.flowRight(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhancer(ContentPage);