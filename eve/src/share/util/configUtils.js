import {SERVER_API_BASE_URL_DEV, SERVER_API_BASE_URL_PRODUCTION} from "src/share/constant/configConstants";

export const getServerAPIBaseURL = () => {

    if (process.env.NODE_ENV === 'production') {
        return SERVER_API_BASE_URL_PRODUCTION;
    }

    return SERVER_API_BASE_URL_DEV;
};