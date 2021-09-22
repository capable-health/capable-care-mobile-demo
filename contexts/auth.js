import Constants from "expo-constants";
import { PropTypes } from "prop-types";
import React, { useEffect, useState, createContext } from "react";

import { CapableAuth } from "../capable";
import { isPasswordless } from "../helpers/auth";
import { SUPPORTED_AUTHS } from "../constants/auth";
import Initializing from "../components/Initializing";

export const AuthContext = createContext({
  cognitoUser: {},
  isLoading: false,
});

export const AuthProvider = (props) => {
  const [cognitoUser, setCognitoUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await CapableAuth.configure({
        Auth: {
          region: Constants.manifest.extra.AWS_REGION,
          userPoolId: Constants.manifest.extra.USER_POOL_ID,
          userPoolWebClientId: Constants.manifest.extra.USER_POOL_WEB_CLIENT_ID,
          authenticationFlowType: isPasswordless()
            ? SUPPORTED_AUTHS.CUSTOM_AUTH
            : SUPPORTED_AUTHS.USER_SRP_AUTH,
        },
        Analytics: {
          disabled: true,
        },
      });
      const currentUser = await CapableAuth.currentAuthenticatedUser();
      setCognitoUser(currentUser);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        cognitoUser,
        setCognitoUser,
        isLoading,
        setIsLoading,
      }}
    >
      {isLoading && <Initializing />}
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};
