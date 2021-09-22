import { PropTypes } from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Sentry from "sentry-expo";
import Logger from "js-logger";
import React, { useState, useContext } from "react";

import { AUTH_ERRORS } from "../../../constants/auth";
import { AuthContext } from "../../../contexts/auth";
import { CapableAuth } from "../../../capable";
import { ErrorContext } from "../../../contexts/error";
import AppButton from "../../../components/AppButton";
import AppTextInput from "../../../components/AppTextInput";

export default function SignIn({ navigation }) {
  const { setIsLoading, setCognitoUser } = useContext(AuthContext);
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
        <Text style={styles.title}>Sign in to your account</Text>
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
          title="Login"
          onPress={() => {
            displayError("");
            setIsLoading(true);
            CapableAuth.signIn(email, password)
              .then((user) => {
                setCognitoUser(user);
                setIsLoading(false);
              })
              .catch((err) => {
                setIsLoading(false);
                displayError(err);
                Logger.error(AUTH_ERRORS.ERROR_SIGNING_IN, err);
                Sentry.Browser.captureException(err);
              });
          }}
        />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.forgotPasswordButtonText}>
              Don&rsquo;t have an account?{" "}
              <Text
                style={{
                  color: "rgb(125, 125, 125)",
                }}
              >
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

SignIn.propTypes = {
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
