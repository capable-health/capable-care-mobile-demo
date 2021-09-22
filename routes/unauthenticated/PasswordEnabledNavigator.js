import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ConfirmSignUp from "../../screens/auth/passwordEnabled/ConfirmSignUp";
import SignIn from "../../screens/auth/passwordEnabled/SignIn";
import SignUp from "../../screens/auth/passwordEnabled/SignUp";

const Stack = createStackNavigator();

const PasswordEnabledStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="SignIn">{(screenProps) => <SignIn {...screenProps} />}</Stack.Screen>
    <Stack.Screen name="SignUp">{(screenProps) => <SignUp {...screenProps} />}</Stack.Screen>
    <Stack.Screen name="ConfirmSignUp">
      {(screenProps) => <ConfirmSignUp {...screenProps} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default PasswordEnabledStack;
