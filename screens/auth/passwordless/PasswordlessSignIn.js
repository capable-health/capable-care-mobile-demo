import { PropTypes } from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Sentry from "sentry-expo";
import Logger from "js-logger";
import React, { useState, useContext } from "react";

import { AUTH_ERRORS } from "../../../constants/auth";
import { AuthContext } from "../../../contexts/auth";
import { CapableAuth } from "../../../capable";
import { ErrorContext } from "../../../contexts/error";
import AppButton from "../../../components/AppButton";
import AppTextInput from "../../../components/AppTextInput";

export default function PasswordlessSignIn({ navigation }) {
  const { setCognitoUser } = useContext(AuthContext);
  const { displayError } = useContext(ErrorContext);
  const [phone_number, setPhoneNumber] = useState("");

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in to your account</Text>
        <AppTextInput
          value={phone_number}
          onChangeText={(text) => setPhoneNumber(text)}
          leftIcon="cellphone"
          placeholder="Enter phone number"
          autoCapitalize="none"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
        />
        <AppButton
          title="Send Code"
          onPress={async () => {
            displayError("");
            try {
              const user = await CapableAuth.signIn(phone_number);
              setCognitoUser(user);
              navigation.navigate("PasswordlessConfirmSignIn");
            } catch (error) {
              Logger.error(AUTH_ERRORS.ERROR_SIGNING_IN, error);
              displayError(error);
              Sentry.Browser.captureException(error);
            }
          }}
        />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("PasswordlessSignUp")}>
            <Text style={styles.forgotPasswordButtonText}>{`Don't have an account? Sign Up`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

PasswordlessSignIn.propTypes = {
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
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: "rgb(150, 150, 150)",
    fontSize: 18,
    fontWeight: "600",
  },
});
