// @flow
import {HOME, ROBOT, CONTENT, LOG} from 'src/share/constant/uriConstants';

export const mapMenuIndexToURL = (index: number): string => {

    switch (index) {
        case 0:
            return HOME;
        case 1:
            return CONTENT;
        case 2:
            return ROBOT;
        case 3:
            return LOG;
        default:
            return HOME;
    }
};