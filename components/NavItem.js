import { PropTypes } from "prop-types";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function AppButton({ title, onPress, activeState, icon }) {
    const assetMapping = {
        community: require("../assets/icon-nav-community.png"),
        profile: require("../assets/icon-nav-profile.png"),
        home: require("../assets/icon-nav-home.png"),
    };

    return (
        <TouchableOpacity
            style={activeState ? [styles.navItem, styles.active] : styles.navItem}
            onPress={onPress}
        >
            <Image source={assetMapping[icon]} style={styles.navIcon} resizeMode={"contain"} />
            <Text style={styles.buttonText}>
                {title}
                {activeState}
            </Text>
        </TouchableOpacity>
    );
}

AppButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    activeState: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    navItem: {
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        opacity: 0.4,
    },
    navIcon: {
        width: 24,
        height: 16,
        marginBottom: 4,
    },
    buttonText: {
        color: "#000",
        fontSize: 10,
        fontWeight: "500",
    },
    active: {
        opacity: 1,
    },
});
