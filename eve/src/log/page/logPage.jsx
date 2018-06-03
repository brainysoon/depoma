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
import {getWechatId} from 'src/share/selector/sharedSelectors';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void,
    push: (string) => void,
    loadChatRecords: (string) => void,
    wechatId: string,
    chatRecords: Array<*>
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
    }
});

class LogPage extends React.Component<Props> {

    componentDidMount() {
        const {loadChatRecords, wechatId} = this.props;
        loadChatRecords(wechatId);
    }

    renderChatRecords(chatRecords) {

        return (<List>
            {chatRecords.map((record) => {

                const primaryText = record.replyContent;
                const secondaryText = record.gmtSent + '      ' +
                    record.toRemarkName + '(' + record.toNickName + '):' + record.chatContent;
                return (<ListItem>
                    <ListItemText primary={primaryText} secondary={secondaryText}/>
                </ListItem>)
            })}
        </List>)
    }

    render() {
        const {classes, chatRecords, ...frameContainerProps} = this.props;

        return (
            <FrameContainer {...frameContainerProps}>
                <div className={classes.root}>
                    {chatRecords ? this.renderChatRecords(chatRecords) :
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
        chatRecords: state.app.chatRecords
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