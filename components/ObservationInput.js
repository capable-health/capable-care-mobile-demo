import { PropTypes } from "prop-types";
import { TextInput, Text } from "react-native";
import { TouchableOpacity, View } from "react-native";
import React from "react";

import styles from "../styles/capableStyle";

const StringInput = ({ value, setValue }) => (
    <TextInput
        style={styles.textInputStyle}
        placeholder=""
        dense={true}
        value={value}
        onChangeText={(value) => setValue(value)}
        keyboardType="default"
        underlineColor={"transparent"}
    />
);

StringInput.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

const IntegerInput = ({ value, setValue }) => (
    <TextInput
        style={styles.textInputStyle}
        placeholder=""
        dense={true}
        value={value}
        onChangeText={(value) => setValue(value)}
        keyboardType="number-pad"
        underlineColor={"transparent"}
    />
);

IntegerInput.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

const FloatInput = ({ value, setValue }) => (
    <TextInput
        style={styles.textInputStyle}
        placeholder=""
        dense={true}
        value={value}
        onChangeText={(value) => setValue(value)}
        keyboardType="decimal-pad"
        underlineColor={"transparent"}
    />
);

FloatInput.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

const BooleanInput = ({ value, setValue }) => (
    <View style={{ flexDirection: "row", justifyContent: "flex-end", margin: 8 }}>
        <TouchableOpacity
            onPress={() => setValue(true)}
            style={
                value === true
                    ? [styles.leftToggleButton, styles.observeButtonSelected]
                    : styles.leftToggleButton
            }
        >
            <Text>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => setValue(false)}
            style={
                value === false
                    ? [styles.rightToggleButton, styles.observeButtonSelected]
                    : styles.rightToggleButton
            }
        >
            <Text>No</Text>
        </TouchableOpacity>
    </View>
);

BooleanInput.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

// TODO: add date picker
const ObservationInput = ({ type, value, setValue }) => {
    switch (type) {
        case "boolean":
            return <BooleanInput value={value} setValue={setValue} />;
        case "integer":
            return <IntegerInput value={value} setValue={setValue} />;
        case "float":
            return <FloatInput value={value} setValue={setValue} />;
        case "string":
            return <StringInput value={value} setValue={setValue} />;
        default:
            return <StringInput value={value} setValue={setValue} />;
    }
};

ObservationInput.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default ObservationInput;
