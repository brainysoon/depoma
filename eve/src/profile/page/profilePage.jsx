// @flow
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import FrameContainer from 'src/share/component/frameContainer';
import {handleBottomNavClick, toggleMenuStatus} from 'src/share/action/sharedActions';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
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
    media: {
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: red[500],
    },

});

class ProfilePage extends React.Component<Props> {

    render() {
        const {classes, ...frameContainerProps} = this.props;

        return (
            <FrameContainer {...frameContainerProps}>
                <div>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton>
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title="Brainysoon"
                            subheader="2018-05-27 12:23 12"
                        />
                        <CardContent>
                            <div>
                            </div>
                        </CardContent>
                        <CardMedia
                            className={classes.media}
                            component='img'
                            image="http://t1.mmonly.cc/uploads/allimg/tuku/22534U130-3.jpg"
                            title="机器人总动员"
                        />
                    </Card>
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
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(ProfilePage);