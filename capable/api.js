import axios from "axios";
import Logger from "js-logger";
import { Auth } from "aws-amplify";

const GET = "get";
const POST = "post";
const PATCH = "patch";

const http = axios.create({
    timeout: 10000,
});

const MISSING_API_URL_ERROR = "Please configure your client with an api_url";

const getAccessToken = () =>
    Auth.currentSession().then((session) => {
        return session.accessToken.jwtToken;
    });

class CapableClient {
    constructor() {
        this.apiUrl = "https://api.sandbox.capablehealth.com";
    }

    static config(conf) {
        if (!conf.apiUrl) {
            throw new Error(MISSING_API_URL_ERROR);
        }
        this.apiUrl = conf.apiUrl;
    }

    static fetch(method, path, config) {
        if (!this.apiUrl) {
            throw new Error(MISSING_API_URL_ERROR);
        }

        return getAccessToken()
            .then((jwtToken) =>
                http.request({
                    method,
                    url: this.apiUrl + path,
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    ...config,
                })
            )
            .then((response) => {
                Logger.info("api response: ", response);
                // TODO: ensure http status code
                return response.data;
            });
    }
}

export { CapableClient, GET, POST, PATCH, Auth as CapableAuth, getAccessToken };
