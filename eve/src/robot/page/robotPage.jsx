// @flow
import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import FrameContainer from 'src/share/component/frameContainer';
import {toggleMenuStatus, handleBottomNavClick} from 'src/share/action/sharedActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from "@material-ui/core/styles/index";

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
});

class RobotPage extends React.Component<Props> {

    render() {
        const {classes, ...frameContainerProps} = this.props;

        return (
            <FrameContainer {...frameContainerProps}>
                <div className={classes.root}>
                    <List>
                        <ListItem>
                            <Avatar src='./eve.jpg'/>
                            <ListItemText primary="机器人编号：WALLE0101" secondary="2018-05-17 12:13 12"/>
                        </ListItem>
                        <ListItem>
                            <Avatar src='./eve.jpg'/>
                            <ListItemText primary="机器人编号：WALLE0100" secondary="2018-05-17 11:11 09"/>
                        </ListItem>
                        <ListItem>
                            <Avatar src='./eve.jpg'/>
                            <ListItemText primary="机器人编号：WALLE0099" secondary="2018-05-17 10:16 14"/>
                        </ListItem>
                        <ListItem>
                            <Avatar src='./eve.jpg'/>
                            <ListItemText primary="机器人编号：WALLE0098" secondary="2018-05-17 10:09 44"/>
                        </ListItem>
                        <ListItem>
                            <Avatar src='./eve.jpg'/>
                            <ListItemText primary="机器人编号：WALLE0097" secondary="2018-05-17 09:01 16"/>
                        </ListItem>
                        <ListItem>
                            <Avatar src='./eve.jpg'/>
                            <ListItemText primary="机器人编号：WALLE0096" secondary="2018-05-17 08:13 07"/>
                        </ListItem>
                        <ListItem>
                            <Avatar src='./eve.jpg'/>
                            <ListItemText primary="机器人编号：WALLE0095" secondary="2018-05-17 07:50 19"/>
                        </ListItem>

                    </List>
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

export default enhancer(RobotPage);