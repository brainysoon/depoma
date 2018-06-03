// @flow
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import FrameContainer from 'src/share/component/frameContainer';
import {handleBottomNavClick, toggleMenuStatus, loadServiceLogs} from 'src/share/action/sharedActions';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles} from "@material-ui/core/styles/index";
import red from '@material-ui/core/colors/red';
import {getWechatId} from 'src/share/selector/sharedSelectors';

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void,
    push: (string) => void,
    loadServiceLogs: (string) => void,
    wechatId: (string) => void
};

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: 40,
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        maxWidth: 400,
    },
    media: {},
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: red[500],
    },
    contentContainer: {
        width: '100%'
    },
    progress: {
        marginTop: 80,
        marginBottom: 80,
        color: theme.palette.primary.light
    },
});

class ProfilePage extends React.Component<Props> {

    componentDidMount() {
        const {wechatId, loadServiceLogs} = this.props;
        loadServiceLogs(wechatId);
    }

    renderServiceLogs = () => {
        const {classes, serviceLogs} = this.props;

        return (<List className={classes.contentContainer}>
            {serviceLogs.map((log, index) => {
                const startTime = '开始时间：' + log.startTime;
                const endTime = '退出时间' + log.endTime;
                return (<ListItem key={index}>
                    <ListItemText primary={startTime} secondary={endTime}/>
                </ListItem>);
            })}
        </List>)
    };

    render() {
        const {classes, wechatInfo, serviceLogs, ...frameContainerProps} = this.props;

        return (
            <FrameContainer {...frameContainerProps}>
                <div className={classes.root}>
                    {wechatInfo && <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar src={wechatInfo.avatarUrl} aria-label="Recipe" className={classes.avatar}>
                                    {wechatInfo.id}
                                </Avatar>
                            }
                            action={
                                <IconButton>
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={wechatInfo.nickName}
                            subheader={wechatInfo.signature}
                        />
                        <CardContent>
                            <div>
                            </div>
                        </CardContent>
                    </Card>}
                    {serviceLogs ? this.renderServiceLogs() :
                        <CircularProgress className={classes.progress} thickness={7}/>}
                </div>
            </FrameContainer>);
    }
}

const mapStateToProps = (state) => {
    return {
        menuStatus: state.app.menuStatus,
        bottomNavCheckedIndex: state.app.bottomNavCheckedIndex,
        wechatInfo: state.app.wechatInfo,
        wechatId: getWechatId(state),
        serviceLogs: state.app.serviceLogs
    }
};

const mapDispatchToProps = {
    toggleMenuStatus: toggleMenuStatus,
    handleBottomNavClick: handleBottomNavClick,
    loadServiceLogs: loadServiceLogs,
    push: push
};

const enhancer = _.flowRight(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(ProfilePage);