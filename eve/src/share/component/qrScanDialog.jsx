// @flow
import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import Slide from '@material-ui/core/Slide';
import TextConstants from "src/share/constant/textConstants";
import withRoot from "src/share/enhancer/withRoot";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {loadWechatLoginPayload, checkWechatLoginState} from 'src/share/action/sharedActions';


type Props = {
    wechatLoginState: boolean,
    wechatLoginPayload: {},
    loadWechatLoginPayload: () => void,
    checkWechatLoginState: () => void
};

const styles = (theme) => ({
    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        display: 'flex'
    },
    appBar: {
        position: 'fixed',
        top: 0,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    flex: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        marginTop: 60,
        backgroundColor: theme.palette.background.default,
    },
    qr: {}
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class QrScanDialog extends React.Component<Props> {

    componentDidMount() {
        const {loadWechatLoginPayload, wechatLoginPayload} = this.props;
        _.isEmpty(wechatLoginPayload) && loadWechatLoginPayload();
    }

    componentWillReceiveProps(nextProps: Props) {
        const {wechatLoginState, wechatLoginPayload} = nextProps;
        if (wechatLoginPayload) {
            const wechat_id = _.get(wechatLoginPayload, 'wechat_id');
            !wechatLoginState && this.checkWechatState(wechat_id);
        }

        if (wechatLoginState) {
            window.clearInterval(this.state.intervalId);
        }
    }

    checkWechatState = (wechat_id) => {
        const {checkWechatLoginState} = this.props;
        let intervalId = setInterval(() => {
            checkWechatLoginState(wechat_id)
        }, 1000);
        this.setState({
            intervalId: intervalId
        })
    };

    render() {
        const {classes, wechatLoginState, wechatLoginPayload} = this.props;
        const qrLink = _.get(wechatLoginPayload, 'link');
        return (
            <div className={classes.appFrame}>
                <Dialog
                    fullScreen
                    open={!wechatLoginState}
                    onClose={_.noop}
                    TransitionComponent={Transition}
                >
                    <AppBar
                        className={classes.appBar}
                    >
                        <Toolbar disableGutters>
                            <IconButton
                                color='inherit'
                                aria-label='qr scan'
                                onClick={_.noop}
                                className={classes.menuButton}
                            >
                                <ErrorIcon/>
                            </IconButton>
                            <Typography variant='title' color='inherit' noWrap>
                                {TextConstants.SCAN_QR_TO_LOGIN}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Card className={classes.contentContainer}>
                        <CardMedia
                            className={classes.qr}
                            component='img'
                            image={qrLink}
                            title="qr"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {TextConstants.SCAN_QR_TO_GRANT_LOGIN}
                            </Typography>
                            <Typography component="p">
                                {TextConstants.GRANT_LOGIN_DESC}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                                {TextConstants.ALREADY_SCAN_QR}
                            </Button>
                        </CardActions>
                    </Card>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wechatLoginState: state.app.wechatLoginState,
        wechatLoginPayload: state.app.wechatLoginPayload
    }
};

const mapDispatchToProps = {
    loadWechatLoginPayload: loadWechatLoginPayload,
    checkWechatLoginState: checkWechatLoginState
};

export default _.flowRight(
    withRoot,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(QrScanDialog);