import { Headline, Title } from "react-native-paper";
import { PropTypes } from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";
import React from "react";

import styles from "../../styles/capableStyle";

const Information = ({ showDialog }) => {
    return (
        <View style={[styles.container, styles.noBottomPadding]}>
            <View style={styles.heading}>
                <Headline style={styles.h2}>My Information</Headline>
            </View>

            <View style={styles.profileList}>
                <TouchableOpacity
                    style={styles.profileNavItem}
                    onPress={() => showDialog("This section may be populated by intake survey")}
                >
                    <Image
                        style={styles.profileIcon}
                        source={require("../../assets/icon-profile-wellness.png")}
                        resizeMode={"contain"}
                    />
                    <Title style={[styles.teamTitle, styles.bold]}>Wellness Profile</Title>
                    <Image
                        style={styles.arrowIcon}
                        source={require("../../assets/icon-arrow.png")}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileNavItem}
                    onPress={() => showDialog("This section may be populated by intake survey")}
                >
                    <Image
                        style={styles.profileIcon}
                        source={require("../../assets/icon-profile-allergies.png")}
                        resizeMode={"contain"}
                    />
                    <Title style={[styles.teamTitle, styles.bold]}>Allergies</Title>
                    <Image
                        style={styles.arrowIcon}
                        source={require("../../assets/icon-arrow.png")}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileNavItem}
                    onPress={() =>
                        showDialog(
                            "This section may be populated by observations recorded by patient"
                        )
                    }
                >
                    <Image
                        style={styles.profileIcon}
                        source={require("../../assets/icon-profile-medications.png")}
                        resizeMode={"contain"}
                    />
                    <Title style={[styles.teamTitle, styles.bold]}>Current Medications</Title>
                    <Image
                        style={styles.arrowIcon}
                        source={require("../../assets/icon-arrow.png")}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileNavItem}
                    onPress={() =>
                        showDialog(
                            "This section may be populated by observations recorded by patient"
                        )
                    }
                >
                    <Image
                        style={styles.profileIcon}
                        source={require("../../assets/icon-profile-vitals.png")}
                        resizeMode={"contain"}
                    />
                    <Title style={[styles.teamTitle, styles.bold]}>Vitals &amp; Trends</Title>
                    <Image
                        style={styles.arrowIcon}
                        source={require("../../assets/icon-arrow.png")}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.profileNavItem, styles.lastProfileNavItem]}
                    onPress={() => showDialog("This section may launch a questionnaire")}
                >
                    <Image
                        style={styles.profileIcon}
                        source={require("../../assets/icon-profile-preferences.png")}
                        resizeMode={"contain"}
                    />
                    <Title style={[styles.teamTitle, styles.bold]}>Care Preferences</Title>
                    <Image
                        style={styles.arrowIcon}
                        source={require("../../assets/icon-arrow.png")}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

Information.propTypes = {
    showDialog: PropTypes.func.isRequired,
};

export default Information;
