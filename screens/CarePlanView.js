import { Avatar, Paragraph, Title, Text } from "react-native-paper";
import { PropTypes } from "prop-types";
import { View } from "react-native";
import React from "react";

import { AppView } from "../components";
import { dayjs } from "../helpers/dayjs";
import BackButton from "../components/BackButton";
import ContentfulRichText from "../components/ContentfulRichText";
import Media from "../components/Media";
import styles from "../styles/capableStyle";

const CarePlanHeader = ({ carePlan, navigation }) => {
    const backupImageFile = "goal-header.jpg";
    const headerImageSource = carePlan.imageUrl
        ? { uri: carePlan.imageUrl }
        : require(`../assets/${backupImageFile}`);
    const headerIsVideo = /\/\/videos/.test(carePlan.imageUrl);
    return (
        <View style={{ position: "relative" }}>
            <BackButton onPress={navigation.goBack} />
            <Media mediaSource={headerImageSource} isVideo={headerIsVideo} />
            <View style={{ paddingHorizontal: 24, marginTop: -64 }}>
                <Text style={[styles.eyebrow, { color: "white" }]}>Current Plan</Text>
                <Title style={[styles.headline, { color: "white" }]}>{carePlan.name}</Title>
            </View>
        </View>
    );
};

CarePlanHeader.propTypes = {
    carePlan: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

const Practitioner = ({ practitionerName, practitionerPicture }) => (
    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 16 }}>
        <Avatar.Image size={56} source={practitionerPicture} />
        <View style={{ flexDirection: "column", alignItems: "left", paddingHorizontal: 16 }}>
            <Text style={{ fontSize: 12, color: "#73778C", paddingBottom: 4 }}>
                Your Practitioner
            </Text>
            <Title style={styles.cardTitle}>{practitionerName}</Title>
        </View>
    </View>
);

Practitioner.propTypes = {
    practitionerName: PropTypes.string.isRequired,
    practitionerPicture: PropTypes.string.isRequired,
};

const Date = ({ date }) => {
    return (
        <View>
            <Text style={[styles.cardSubHead, { fontSize: 10, color: "#999999" }]}>
                Last Modified
            </Text>
            <Title style={styles.cardTitle}>{date}</Title>
        </View>
    );
};

Date.propTypes = {
    date: PropTypes.string.isRequired,
};

const CarePlanDescription = ({ carePlan, practitionerName, practitionerPicture }) => {
    const formattedDescription =
        carePlan.description?.nodeType == "document" ? (
            <ContentfulRichText doc={carePlan.description} />
        ) : (
            carePlan.description
        );
    const lastModified = dayjs.utc(carePlan.updated_at).format("MMMM D, YYYY");
    return (
        <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40, width: "100%" }}>
            <Practitioner
                practitionerName={practitionerName}
                practitionerPicture={practitionerPicture}
            />
            {formattedDescription && (
                <Paragraph style={styles.paragraph}>{formattedDescription}</Paragraph>
            )}
            <Date date={lastModified} />
        </View>
    );
};

CarePlanDescription.propTypes = {
    carePlan: PropTypes.object.isRequired,
    practitionerName: PropTypes.string.isRequired,
    practitionerPicture: PropTypes.string.isRequired,
};

const CarePlanView = ({ route, navigation }) => {
    const { carePlan } = route.params;
    // eventually pull these from carePlan
    const practitionerName = "Dr. Lauren Potapova";
    const practitionerPicture = require("../assets/profile-member-03.png");

    return (
        <AppView>
            <CarePlanHeader carePlan={carePlan} navigation={navigation} />
            <CarePlanDescription
                carePlan={carePlan}
                practitionerName={practitionerName}
                practitionerPicture={practitionerPicture}
            />
        </AppView>
    );
};

CarePlanView.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

export default CarePlanView;
