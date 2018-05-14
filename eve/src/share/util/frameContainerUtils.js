// @flow
import {HOME, ROBOT} from 'src/share/constant/uriConstants';

export const mapMenuIndexToURL = (index: number): string => {

    switch (index) {
        case 0:
            return ROBOT;
        case 1:
            return HOME;
        default:
            return HOME;
    }
};