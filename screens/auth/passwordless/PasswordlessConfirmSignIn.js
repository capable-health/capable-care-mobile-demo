import { PropTypes } from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import * as Sentry from "sentry-expo";
import Logger from "js-logger";
import React, { useContext, useState } from "react";

import { AUTH_ERRORS } from "../../../constants/auth";
import { AuthContext } from "../../../contexts/auth";
import { CapableAuth } from "../../../capable";
import { ErrorContext } from "../../../contexts/error";
import AppButton from "../../../components/AppButton";
import AppTextInput from "../../../components/AppTextInput";

export default function PasswordlessConfirmSignIn() {
  const { displayError } = useContext(ErrorContext);
  const { cognitoUser, setCognitoUser } = useContext(AuthContext);
  const [otp, setOTP] = useState("");

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter One Time Password</Text>
        <AppTextInput
          value={otp}
          onChangeText={(text) => setOTP(text)}
          leftIcon="numeric"
          placeholder="otp"
          textContentType="oneTimeCode"
          keyboardType="number-pad"
        />
        <AppButton
          title="Sign In"
          onPress={async () => {
            displayError("");
            try {
              const updatedUser = await CapableAuth.sendCustomChallengeAnswer(cognitoUser, otp);
              if (updatedUser.signInUserSession == null) {
                Logger.error(AUTH_ERRORS.VERIFICATION_CODE_NO_MATCH);
                displayError(AUTH_ERRORS.VERIFICATION_CODE_NO_MATCH);
              } else {
                setCognitoUser(updatedUser);
              }
            } catch (error) {
              Logger.error(AUTH_ERRORS.VERIFICATION_CODE_NO_MATCH, error.code);
              displayError(error);
              Sentry.Browser.captureException(error);
              Logger.debug(error);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

PasswordlessConfirmSignIn.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#202020",
    fontWeight: "500",
    marginVertical: 15,
  },
  forgotPasswordButtonText: {
    color: "rgb(150, 150, 150)",
    fontSize: 18,
    fontWeight: "600",
  },
});
