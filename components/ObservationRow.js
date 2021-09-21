import { PropTypes } from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";

import { dayjs } from "../helpers/dayjs";
import { findOneTagByType } from "../helpers/tagging";
import { wellnessScale } from "../helpers/wellness";
import CustomIcon from "./CustomEmotionIcon";
import styles from "../styles/capableStyle";
import TargetIcon from "./TargetIcon";

const ObservationRow = ({ observationTargets }) => {
    let observationDate;
    const targetList = observationTargets.map((observationTarget) => {
        const { observation, target } = observationTarget;
        const targetType = findOneTagByType(target.tag_list, "type");
        observationDate = dayjs.utc(observation.observed_date).format("MM/DD/YY");
        const observationValue =
            observation.observed_value && !targetType
                ? `${observation.observed_value} ${target.name.toLowerCase()}`
                : null;

        let icon;
        if (targetType == "wellness") {
            icon = <CustomIcon name={wellnessScale[observation.observed_value]} />;
        } else if (targetType == "thumbs") {
            icon = (
                <Icon
                    name={observation.observed_value == 1 ? "thumbs-up" : "thumbs-down"}
                    style={{ fontSize: 18 }}
                />
            );
        } else {
            icon = <TargetIcon target={target} style={StyleSheet.flatten(styles.cardStatIcon)} />;
        }

        return (
            <View style={styles.cardStat} key={target.name}>
                {icon}
                <Text style={styles.cardStatLabel}>{observationValue}</Text>
            </View>
        );
    });

    return (
        <View style={styles.cardStat}>
            <Icon name={"calendar-alt"} style={{ color: "#000", marginRight: 8 }} />
            <Text style={styles.cardStatLabel}>{observationDate}</Text>
            {targetList}
        </View>
    );
};

ObservationRow.propTypes = {
    observationTargets: PropTypes.array.isRequired,
};

export default ObservationRow;
