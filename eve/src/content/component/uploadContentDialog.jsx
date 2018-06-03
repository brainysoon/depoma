// @flow
import _ from 'lodash';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import {withStyles} from "@material-ui/core/styles/index";
import Button from '@material-ui/core/Button';


type Props = {
    showAddDialog: boolean
}

const styles = theme => ({
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: 5,
        flexDirection: 'column'
    },
    content: {
        margin: 12
    },
    submit: {
        margin: 12
    }
});

const UploadContentDialog = (props: Props) => {
    const {showAddDialog, classes} = props;

    return (<Dialog open={showAddDialog}>
        <DialogTitle>上传文件</DialogTitle>
        <form className={classes.formContainer}>
            <Input className={classes.content} type='file'/>
            <Button className={classes.submit} color='primary' type='submit' variant='raised'>上传</Button>
        </form>
    </Dialog>)
};

const enhancer = _.flowRight(
    withStyles(styles)
);

export default enhancer(UploadContentDialog);