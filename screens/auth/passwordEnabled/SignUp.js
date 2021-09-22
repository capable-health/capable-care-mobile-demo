import { PropTypes } from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Sentry from "sentry-expo";
import Logger from "js-logger";
import React, { useContext, useState } from "react";

import { CapableAuth } from "../../../capable";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import { AUTH_ERRORS } from "../../../constants/auth";
import { ErrorContext } from "../../../contexts/error";

export default function SignUp({ navigation }) {
  const { displayError } = useContext(ErrorContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/capable_logo.png")}
          style={styles.logo}
          resizeMode={"contain"}
        />
        <Text style={styles.title}>Create a new account</Text>
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
          value={password}
          onChangeText={(text) => setPassword(text)}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <AppButton
          title="Sign Up"
          onPress={async () => {
            displayError("");
            try {
              CapableAuth.signUp({
                username: email,
                password,
                attributes: { email },
              });
              navigation.navigate("ConfirmSignUp");
            } catch (error) {
              Logger.error(AUTH_ERRORS.ERROR_SIGNING_UP, error);
              displayError(error);
              Sentry.Browser.captureException(error);
            }
          }}
        />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.forgotPasswordButtonText}>
              Already have an account?{" "}
              <Text
                style={{
                  color: "rgb(125, 125, 125)",
                }}
              >
                Sign In
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  logo: {
    width: 200,
    height: 100,
    marginTop: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#020228",
    marginVertical: 15,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: "rgb(150, 150, 150)",
    fontSize: 16,
  },
});
