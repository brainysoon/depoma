// @flow
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import FrameContainer from 'src/share/component/frameContainer';
import {handleBottomNavClick, toggleMenuStatus} from 'src/share/action/sharedActions';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles} from "@material-ui/core/styles/index";
import red from '@material-ui/core/colors/red';

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void,
    push: (string) => void
};

const styles = theme => ({
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

});

class ProfilePage extends React.Component<Props> {

    render() {
        const {classes, wechatInfo, ...frameContainerProps} = this.props;

        return (
            <FrameContainer {...frameContainerProps}>
                <div>
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
                </div>
            </FrameContainer>);
    }
}

const mapStateToProps = (state) => {
    return {
        menuStatus: state.app.menuStatus,
        bottomNavCheckedIndex: state.app.bottomNavCheckedIndex,
        wechatInfo: state.app.wechatInfo
    }
};

const mapDispatchToProps = {
    toggleMenuStatus: toggleMenuStatus,
    handleBottomNavClick: handleBottomNavClick,
    push: push
};

const enhancer = _.flowRight(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(ProfilePage);