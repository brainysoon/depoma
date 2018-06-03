// @flow
import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import FrameContainer from 'src/share/component/frameContainer';
import {
    toggleMenuStatus,
    handleBottomNavClick,
    loadWechatSamples,
    deleteWechatSample
} from 'src/share/action/sharedActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from "@material-ui/core/styles/index";
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import UploadContentDialog from 'src/content/component/uploadContentDialog';
import {getWechatId} from 'src/share/selector/sharedSelectors';

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void,
    push: (string) => void,
    loadWechatSamples: (string) => void,
    wechatId: string,
    wechatSamples: Array<*>,
    deleteWechatSample: (string, string) => void
};


const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
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
    progress: {
        marginTop: 80,
        marginBottom: 80,
        color: theme.palette.primary.light
    }
});

class ContentPage extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = {showAddDialog: false}
    }

    componentDidMount() {
        const {wechatId, loadWechatSamples} = this.props;
        loadWechatSamples(wechatId);
    }

    onAddContentButtonClick = () => {
        this.setState({showAddDialog: true})
    };

    onContentFileUploadCompleted = () => {
        const {wechatId, loadWechatSamples} = this.props;
        this.setState({showAddDialog: false});

        loadWechatSamples(wechatId);
    };

    onDeleteWechatSample = (sampleId) => {
        const {deleteWechatSample, wechatId} = this.props;
        deleteWechatSample(wechatId, sampleId);
    };

    renderWechatSamples = (wechatSamples) => {
        return (<List>
            {wechatSamples.map((sample, index) => {
                return (<ListItem key={index}>
                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={sample.sampleAddr} secondary={sample.gmtModified}/>
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Delete" onClick={() => {
                            this.onDeleteWechatSample(sample.id);
                        }}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>)
            })}
        </List>)
    };

    render() {
        const {classes, wechatId, wechatSamples, ...frameContainerProps} = this.props;
        const {showAddDialog} = this.state;

        return (
            <FrameContainer {...frameContainerProps}>
                <div className={classes.root}>
                    {wechatSamples ? this.renderWechatSamples(wechatSamples) :
                        <CircularProgress className={classes.progress} thickness={7}/>}
                    <Tooltip title="上传常用聊天内容">
                        <Button variant="fab" color="primary" className={classes.absolute}
                                onClick={this.onAddContentButtonClick}>
                            <AddIcon/>
                        </Button>
                    </Tooltip>
                    <UploadContentDialog wechatId={wechatId}
                                         onContentFileUploadCompleted={this.onContentFileUploadCompleted}
                                         showAddDialog={showAddDialog}/>
                </div>
            </FrameContainer>);
    }
}

const mapStateToProps = (state) => {
    return {
        menuStatus: state.app.menuStatus,
        bottomNavCheckedIndex: state.app.bottomNavCheckedIndex,
        wechatId: getWechatId(state),
        wechatSamples: state.app.wechatSamples
    }
};

const mapDispatchToProps = {
    toggleMenuStatus: toggleMenuStatus,
    handleBottomNavClick: handleBottomNavClick,
    loadWechatSamples: loadWechatSamples,
    deleteWechatSample: deleteWechatSample,
    push: push
};

const enhancer = _.flowRight(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhancer(ContentPage);