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

class ProfilePage extends React.Component<Props> {

    render() {
        const {...frameContainerProps} = this.props;

        return (
            <FrameContainer {...frameContainerProps}>
                <h2>请扫描二维码绑定微信!</h2>
                <img src='QR.png'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);