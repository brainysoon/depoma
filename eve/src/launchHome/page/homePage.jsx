// @flow
import React from 'react';
import {connect} from 'react-redux';
import FrameContainer from 'src/share/component/frameContainer';
import {toggleMenuStatus, handleBottomNavClick} from 'src/share/action/sharedActions';

type Props = {
    menuStatus: boolean,
    bottomNavCheckedIndex: number,
    toggleMenuStatus: () => void,
    handleBottomNavClick: (number) => void
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
    handleBottomNavClick: handleBottomNavClick
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);