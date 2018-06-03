// @flow
import _ from 'lodash';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from "@material-ui/core/styles/index";
import {Uploader, UploadField} from '@navjobs/upload'
import FileUploadIcon from '@material-ui/icons/FileUpload';
import {SERVER_API_BASE_URL_PRODUCTION, SERVER_API_BASE_URL_DEV} from 'src/share/constant/configConstants';


type Props = {
    showAddDialog: boolean,
    showNotSelectFileError: boolean,
    onUploadContentFile: () => void,
    onContentFileChange: () => void,
    wechatId: string
}

const styles = theme => ({
    root: {
        padding: 10
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        margin: theme.spacing.unit
    },
    progress: {}
});

const UploadContentDialog = (props: Props) => {
    const {
        showAddDialog, classes, onContentFileUploadCompleted,
        wechatId
    } = props;

    return (<Dialog open={showAddDialog} className={classes.root}>
        <DialogTitle>上传常用聊天内容</DialogTitle>
        <Uploader
            request={{
                fileName: 'contentFile',
                url: SERVER_API_BASE_URL_PRODUCTION + '/wechat/sample/add',
                method: 'POST',
                fields: {
                    wechatId: wechatId,
                },
                headers: {},
                withCredentials: false,
            }}
            onComplete={({response, status}) => {
                if (status === 200) {
                    onContentFileUploadCompleted()
                }
            }}
            uploadOnSelection={true}
        >
            {({onFiles, progress}) => (
                <div className={classes.contentContainer}>
                    <UploadField onFiles={onFiles}>
                        {progress ? <CircularProgress className={classes.progress} value={progress}/> :
                            <Button variant="raised" color="primary" className={classes.button}>
                                选择上传文件
                                <FileUploadIcon/>
                            </Button>}
                    </UploadField>
                </div>
            )}
        </Uploader>
    </Dialog>)
};

const enhancer = _.flowRight(
    withStyles(styles)
);

export default enhancer(UploadContentDialog);