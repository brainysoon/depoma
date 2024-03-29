// @flow
import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import FrameContainer from 'src/share/component/frameContainer';
import {toggleMenuStatus, handleBottomNavClick, loadWechatRobots} from 'src/share/action/sharedActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from "@material-ui/core/styles/index";
import {getWechatId} from 'src/share/selector/sharedSelectors';
import {SERVER_RESOURCES_BASE_URL_PRODUCTION} from 'src/share/constant/configConstants';

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void,
    push: (string) => void,
    loadWechatRobots: (string) => void,
    wechatRobots: Array<*>,
    wechatId: string
};

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: 40,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    progress: {
        marginTop: 80,
        marginBottom: 80,
        color: theme.palette.primary.light
    },
    contentContainer: {
        width: '100%'
    }
});

class RobotPage extends React.Component<Props> {

    componentDidMount() {
        const {wechatId, loadWechatRobots} = this.props;
        loadWechatRobots(wechatId);
    }

    renderWechatRobots = () => {
        const {classes, wechatRobots} = this.props;
        const avatarURL = SERVER_RESOURCES_BASE_URL_PRODUCTION + '/eve.jpg';

        return (<List className={classes.contentContainer}>
            {wechatRobots.map((robot, index) => {
                return (<ListItem key={index}>
                    <Avatar src={avatarURL}/>
                    <ListItemText primary={robot.robotName} secondary={robot.gmtModified}/>
                </ListItem>);
            })}
        </List>)
    };

    render() {
        const {classes, wechatRobots, ...frameContainerProps} = this.props;

        return (
            <FrameContainer {...frameContainerProps}>
                <div className={classes.root}>
                    {wechatRobots ? this.renderWechatRobots() :
                        <CircularProgress className={classes.progress} thickness={7}/>}
                </div>
            </FrameContainer>);
    }
}

const mapStateToProps = (state) => {
    return {
        menuStatus: state.app.menuStatus,
        bottomNavCheckedIndex: state.app.bottomNavCheckedIndex,
        wechatId: getWechatId(state),
        wechatRobots: state.app.wechatRobots
    }
};

const mapDispatchToProps = {
    toggleMenuStatus: toggleMenuStatus,
    handleBottomNavClick: handleBottomNavClick,
    loadWechatRobots: loadWechatRobots,
    push: push
};

const enhancer = _.flowRight(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhancer(RobotPage);