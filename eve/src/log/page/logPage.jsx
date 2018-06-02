// @flow
import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import FrameContainer from 'src/share/component/frameContainer';
import {toggleMenuStatus, handleBottomNavClick, loadChatRecords} from 'src/share/action/sharedActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from "@material-ui/core/styles/index";
import {getWechatId} from 'src/log/selector/logPageSelector';

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void,
    push: (string) => void,
    loadChatRecords: (string) => void,
    wechatId: string
};


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        marginBottom: 30
    },
});

class LogPage extends React.Component<Props> {

    componentDidMount() {
        const {loadChatRecords, wechatId} = this.props;
        loadChatRecords(wechatId);
    }

    render() {
        const {classes, ...frameContainerProps} = this.props;

        return (
            <FrameContainer {...frameContainerProps}>
                <div className={classes.root}>
                    <List>
                        <ListItem>
                            <ListItemText primary="回复内容：你也好呀！" secondary="2018-05-17 12:13 12"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：我是计算机科学技术学院的学生" secondary="2018-05-17 12:10 09"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：软件工程专业" secondary="2018-05-17 12:08 11"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：现在大四了" secondary="2018-05-17 12:07 19"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：学校名字叫北华大学" secondary="2018-05-17 12:06 01"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：没事，不用谢" secondary="2018-05-17 12:05 40"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：再见，下次再聊" secondary="2018-05-17 12:04 50"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：再见，下次再聊" secondary="2018-05-17 12:04 50"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：再见，下次再聊" secondary="2018-05-17 12:04 50"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：再见，下次再聊" secondary="2018-05-17 12:04 50"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：再见，下次再聊" secondary="2018-05-17 12:04 50"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：再见，下次再聊" secondary="2018-05-17 12:04 50"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：再见，下次再聊" secondary="2018-05-17 12:04 50"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：再见，下次再聊" secondary="2018-05-17 12:04 50"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="回复内容：再见，下次再聊" secondary="2018-05-17 12:04 50"/>
                        </ListItem>

                    </List>
                </div>
            </FrameContainer>);
    }
}

const mapStateToProps = (state) => {
    return {
        menuStatus: state.app.menuStatus,
        bottomNavCheckedIndex: state.app.bottomNavCheckedIndex,
        wechatId: getWechatId(state)
    }
};

const mapDispatchToProps = {
    toggleMenuStatus: toggleMenuStatus,
    handleBottomNavClick: handleBottomNavClick,
    loadChatRecords: loadChatRecords,
    push: push
};

const enhancer = _.flowRight(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhancer(LogPage);