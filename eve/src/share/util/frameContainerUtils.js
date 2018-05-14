// @flow
import URIConstants from 'src/share/constant/uriConstants';

export const mapMenuIndexToURL = (index: number): string => {

    switch (index) {
        case 0:
            return URIConstants.PROFILE;
        case 1:
            return URIConstants.CONTENT;
        case 2:
            return URIConstants.ROBOT;
        case 3:
            return URIConstants.LOG;
        default:
            return URIConstants.PROFILE;
    }
};