import { PropTypes } from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Sentry from "sentry-expo";
import Logger from "js-logger";
import password from "secure-random-password";
import React, { useContext, useState } from "react";

import { AUTH_ERRORS } from "../../../constants/auth";
import { CapableAuth } from "../../../capable";
import { ErrorContext } from "../../../contexts/error";
import AppButton from "../../../components/AppButton";
import AppTextInput from "../../../components/AppTextInput";

export default function PasswordlessSignUp({ navigation }) {
    const { displayError } = useContext(ErrorContext);

    const [phone_number, setPhoneNumber] = useState("");

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Create a new account</Text>
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
                    title="Sign Up"
                    onPress={async () => {
                        displayError("");
                        try {
                            await CapableAuth.signUp({
                                username: phone_number,
                                password: password.randomPassword({
                                    length: 15,
                                    characters: [
                                        password.lower,
                                        password.upper,
                                        password.digits,
                                        password.symbols,
                                    ],
                                }),
                                attributes: { phone_number },
                            });
                            navigation.navigate("PasswordlessSignIn");
                        } catch (error) {
                            Logger.error(AUTH_ERRORS.ERROR_SIGNING_UP, error);
                            displayError(error);
                            Sentry.Browser.captureException(error);
                        }
                    }}
                />
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("PasswordlessSignIn")}>
                        <Text style={styles.forgotPasswordButtonText}>
                            Already have an account? Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

PasswordlessSignUp.propTypes = {
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
