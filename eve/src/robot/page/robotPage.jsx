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

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void,
    push: (string) => void,
    loadWechatRobots: (string) => void,
    wechatRobots: Array<*>
};

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: 40,
        display: 'flex',
        justifyContent: 'center'
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

        return (<List className={classes.contentContainer}>
            {wechatRobots.map((robot, index) => {
                return (<ListItem key={index}>
                    <Avatar src='./eve.jpg'/>
                    <ListItemText primary={robot.robotName} secondary={robot.gmtModified}/>
                </ListItem>);
            })}
        </List>)
    }

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