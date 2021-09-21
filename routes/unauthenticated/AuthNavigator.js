import React from "react";

import { isPasswordless } from "../../helpers/auth";
import PasswordEnabledStack from "./PasswordEnabledNavigator";
import PasswordlessStack from "./PasswordlessNavigator";

const AuthNavigator = () => {
    return isPasswordless() ? <PasswordlessStack /> : <PasswordEnabledStack />;
};

export default AuthNavigator;
