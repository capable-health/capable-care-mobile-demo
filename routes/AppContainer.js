import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Sentry from "sentry-expo";
import Constants from "expo-constants";
import Logger from "js-logger";

import { AuthContext } from "../contexts/auth";
import { CapableClient } from "../capable/api";
import AuthNavigator from "./unauthenticated/AuthNavigator";
import Navigator from "./authenticated/Navigator";
import theme from "../styles/theme";

const AppContainer = () => {
  const { cognitoUser } = useContext(AuthContext);
  const isAuthenticated = cognitoUser.signInUserSession;

  useEffect(() => {
    Logger.setDefaults();
    if (Constants.manifest.extra.CH_ENV) {
      Sentry.init({
        dsn: Constants.manifest.extra.SENTRY_DSN,
        environment: Constants.manifest.extra.CH_ENV,
        enableInExpoDevelopment: true,
      });
    }
    CapableClient.config({ apiUrl: Constants.manifest.extra.API_URL });
  }, []);

  return (
    <NavigationContainer theme={theme.CombinedDefaultTheme}>
      {isAuthenticated ? <Navigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppContainer;
