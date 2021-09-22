import { PropTypes } from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Sentry from "sentry-expo";
import Logger from "js-logger";
import React, { useContext, useState } from "react";

import { AUTH_ERRORS } from "../../../constants/auth";
import { CapableAuth } from "../../../capable";
import { ErrorContext } from "../../../contexts/error";
import AppButton from "../../../components/AppButton";
import AppTextInput from "../../../components/AppTextInput";

export default function ConfirmSignUp({ navigation }) {
  const { displayError } = useContext(ErrorContext);
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Sign Up</Text>
        <AppTextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={authCode}
          onChangeText={(text) => setAuthCode(text)}
          leftIcon="numeric"
          placeholder="Enter verification code"
          keyboardType="numeric"
        />
        <AppButton
          title="Confirm Sign Up"
          onPress={async () => {
            displayError("");
            try {
              await CapableAuth.confirmSignUp(email, authCode);
              navigation.navigate("SignIn");
            } catch (error) {
              Logger.error(AUTH_ERRORS.VERIFICATION_CODE_NO_MATCH, error.code);
              displayError(error);
              Sentry.Browser.captureException(error);
            }
          }}
        />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => CapableAuth.resendSignUp(email)}>
            <Text style={styles.forgotPasswordButtonText}>resend code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

ConfirmSignUp.propTypes = {
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
