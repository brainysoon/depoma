// @flow
import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import FrameContainer from 'src/share/component/frameContainer';
import {withStyles} from "@material-ui/core/styles/index";
import {handleBottomNavClick, toggleMenuStatus} from "src/share/action/sharedActions";
import {push} from "react-router-redux";

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void,
    push: (string) => void
};


const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 40,
        backgroundColor: theme.palette.background.paper,
    },
    content: {
        padding: 4
    }
});

class AboutPage extends React.Component<Props> {

    render() {
        const {classes, ...frameContainerProps} = this.props;

        return (
            <FrameContainer {...frameContainerProps}>
                <div className={classes.root}>
                    <p className={classes.content}>
                        &nbsp;&nbsp;&nbsp;&nbsp;本项目为自己毕业设计作品，非商用！！！仅供自己学习所用。
                    </p>
                </div>
            </FrameContainer>);
    }
}

const mapStateToProps = (state) => {
    return {
        menuStatus: state.app.menuStatus,
        bottomNavCheckedIndex: state.app.bottomNavCheckedIndex,
    }
};

const mapDispatchToProps = {
    toggleMenuStatus: toggleMenuStatus,
    handleBottomNavClick: handleBottomNavClick,
    push: push,
};

const enhancer = _.flowRight(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhancer(AboutPage);