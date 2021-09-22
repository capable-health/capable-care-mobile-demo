import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import PasswordlessConfirmSignIn from "../../screens/auth/passwordless/PasswordlessConfirmSignIn";
import PasswordlessSignIn from "../../screens/auth/passwordless/PasswordlessSignIn";
import PasswordlessSignUp from "../../screens/auth/passwordless/PasswordlessSignUp";

const Stack = createStackNavigator();

const PasswordlessStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="PasswordlessSignIn">
        {(screenProps) => <PasswordlessSignIn {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="PasswordlessConfirmSignIn">
        {(screenProps) => <PasswordlessConfirmSignIn {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="PasswordlessSignUp">
        {(screenProps) => <PasswordlessSignUp {...screenProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default PasswordlessStack;
