// @flow
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import FrameContainer from 'src/share/component/frameContainer';
import {toggleMenuStatus, handleBottomNavClick} from 'src/share/action/sharedActions';

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void,
    push: (string) => void
};

const styles = theme => ({});

class HomePage extends React.Component<Props> {

    render() {
        const {...frameContainerProps} = this.props;

        return (
            <FrameContainer {...frameContainerProps}>
                <h1>Hello World!</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);