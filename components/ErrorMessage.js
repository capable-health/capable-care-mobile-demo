import { PropTypes } from "prop-types";
import { Snackbar, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome5";
import React from "react";

const FAILED_WITH_ERROR = "failed with error";

const ErrorMessage = ({ errorMessage, displayError }) => {
    const onDismissSnackBar = () => displayError("");

    const parsedErrorMessage = (message) => {
        if (message.includes(FAILED_WITH_ERROR)) {
            message = message.substring(
                message.indexOf(FAILED_WITH_ERROR) + FAILED_WITH_ERROR.length + 1
            );
        }
        return message;
    };
    return (
        <View style={styles.container}>
            <Snackbar
                style={styles.snack}
                visible={errorMessage != ""}
                onDismiss={onDismissSnackBar}
                duration="60000"
                action={{
                    label: <AwesomeIcon name="times" style={{ color: "#FFF" }} />,
                    onPress: () => {
                        // Do something
                    },
                }}
            >
                <Text style={styles.snackText}>{parsedErrorMessage(errorMessage)}</Text>
            </Snackbar>
        </View>
    );
};

ErrorMessage.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    displayError: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
    },
    snack: {
        backgroundColor: "#F8BE39",
    },
    snackText: {
        color: "#000",
    },
});

export default ErrorMessage;
