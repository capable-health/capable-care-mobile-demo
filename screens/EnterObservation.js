import { PropTypes } from "prop-types";
import { Title, Surface, Button, Menu } from "react-native-paper";
import { TouchableOpacity, View, SafeAreaView, Text } from "react-native";
import * as Sentry from "sentry-expo";
import Icon from "react-native-vector-icons/FontAwesome5";
import Logger from "js-logger";
import React, { useState } from "react";

import { AppView } from "../components";
import { dayjs, tomorrow } from "../helpers/dayjs";
import { findOneTagByType } from "../helpers/tagging";
import { Observation } from "../capable";
import { wellnessScale } from "../helpers/wellness";
import CustomIcon from "../components/CustomEmotionIcon";
import ObservationInput from "../components/ObservationInput";
import styles from "../styles/capableStyle";
import TargetIcon from "../components/TargetIcon";

const fmtDate = (date) => dayjs.utc(date).format("MM/DD/YYYY");

const WellnessButton = ({ value, setValue, wellnessIndex }) => (
    <TouchableOpacity
        onPress={() => setValue(wellnessIndex)}
        style={
            wellnessIndex === value
                ? [styles.observeButton, styles.observeButtonSelected]
                : styles.observeButton
        }
    >
        <CustomIcon name={wellnessScale[wellnessIndex]} />
    </TouchableOpacity>
);

WellnessButton.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    setValue: PropTypes.func.isRequired,
    wellnessIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const WellnessSelector = ({ target, value, setValue }) => {
    return (
        <View>
            <Title style={styles.label}>{target.name}</Title>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                {Object.keys(wellnessScale)
                    .sort()
                    .map((i) => (
                        <WellnessButton
                            key={i}
                            value={value}
                            setValue={setValue}
                            wellnessIndex={i}
                        />
                    ))}
            </View>
        </View>
    );
};

WellnessSelector.propTypes = {
    target: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    setValue: PropTypes.func.isRequired,
};

const DoneButton = ({ value, setValue, done }) => (
    <TouchableOpacity
        onPress={() => setValue(done)}
        style={
            value === done
                ? [styles.observeButton, styles.observeButtonSelected]
                : styles.observeButton
        }
    >
        <Icon name={done ? "thumbs-up" : "thumbs-down"} size={24} />
    </TouchableOpacity>
);

DoneButton.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    setValue: PropTypes.func.isRequired,
    done: PropTypes.number.isRequired,
};

const DoneSelector = ({ target, value, setValue }) => {
    return (
        <View>
            <Title style={styles.label}>{target.name}</Title>
            <View style={{ flexDirection: "row", justifyContent: "flex-start", width: "100%" }}>
                <DoneButton value={value} setValue={setValue} done={0} />
                <DoneButton value={value} setValue={setValue} done={1} />
            </View>
        </View>
    );
};

DoneSelector.propTypes = {
    target: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    setValue: PropTypes.func.isRequired,
};

const DateMenu = ({ observationDate, setObservationDate, datesRefs }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const dateOptionSelected = (date) => {
        setObservationDate(date);
        closeMenu();
    };

    const dateList = Object.keys(datesRefs)
        .filter((date) => dayjs(date, "MM/DD/YYYY").isBefore(tomorrow))
        .sort()
        .reverse()
        .map((date, i) => {
            return (
                <Menu.Item
                    style={{ fontSize: 12 }}
                    key={i}
                    visible={observationDate == date}
                    onPress={() => dateOptionSelected(date)}
                    title={date}
                />
            );
        });

    return (
        <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>{observationDate}</Button>}
        >
            {dateList}
        </Menu>
    );
};

DateMenu.propTypes = {
    observationDate: PropTypes.string,
    setObservationDate: PropTypes.func.isRequired,
    datesRefs: PropTypes.object,
};

const ObservationInputWrapper = ({ target, value, setValue }) => {
    const targetType = findOneTagByType(target.tag_list, "type");

    if (targetType == "wellness") {
        return <WellnessSelector target={target} value={value} setValue={setValue} />;
    } else if (targetType == "thumbs") {
        return <DoneSelector target={target} value={value} setValue={setValue} />;
    } else {
        return (
            <View style={styles.fieldContainer}>
                <View style={styles.cardStat}>
                    <TargetIcon target={target} style={{ marginRight: 8 }} />
                    <Text>{target.name}</Text>
                </View>
                <ObservationInput type={target.data_type} value={value} setValue={setValue} />
            </View>
        );
    }
};

ObservationInputWrapper.propTypes = {
    target: PropTypes.object.isRequired,
    value: PropTypes.any.isRequired,
    setValue: PropTypes.func.isRequired,
};

const TargetEntriesWithDate = ({
    goal,
    observationDate,
    setObservationDate,
    observationTargets,
    setObservationTargets,
    datesRefs,
}) => {
    const observationEntries = goal.targets.map((target) => {
        const value = observationTargets[target.id].value;
        const setValue = (value) => {
            setObservationTargets((prevTargets) => ({
                ...prevTargets,
                [target.id]: { ...prevTargets[target.id], value: value },
            }));
        };
        return (
            <ObservationInputWrapper
                target={target}
                value={value}
                setValue={setValue}
                key={target.id}
            />
        );
    });

    return (
        <SafeAreaView style={{ flexDirection: "column", alignItems: "inherit" }}>
            <View style={styles.fieldContainer}>
                <View style={styles.cardStat}>
                    <Icon name="calendar-alt" style={{ color: "#000", marginRight: 8 }} />
                    <Text>Date</Text>
                </View>
                <DateMenu
                    observationDate={observationDate}
                    setObservationDate={setObservationDate}
                    datesRefs={datesRefs}
                />
            </View>
            {observationEntries}
        </SafeAreaView>
    );
};

TargetEntriesWithDate.propTypes = {
    goal: PropTypes.object.isRequired,
    observationDate: PropTypes.string.isRequired,
    setObservationDate: PropTypes.func.isRequired,
    observationTargets: PropTypes.object,
    setObservationTargets: PropTypes.func.isRequired,
    datesRefs: PropTypes.object,
};

const ActionButtons = ({ goal, observationDate, observationTargets, navigation, datesRefs }) => {
    const save = () => {
        const placeholders = goal.placeholdersForDate(datesRefs[observationDate]);
        if (placeholders.length > 0) {
            Promise.all(
                placeholders.map((placeholder) => {
                    const observed_value = observationTargets[placeholder.target_id].value;
                    return placeholder.store(observed_value);
                })
            )
                .then(() => {
                    Logger.debug("saved");
                    navigation.navigate("Home");
                })
                .catch((error) => {
                    Logger.error("Error while saving: ", error);
                    Sentry.Browser.captureException(error);
                });
        } else {
            if (goal.recurrence)
                Logger.warn("Saving unbound observation in recurring goal. ", goal);

            Promise.all(
                goal.targets.map((target) => {
                    const observed_value = observationTargets[target.id].value;
                    return Observation.store({
                        observed_value,
                        observed_date:
                            datesRefs[observationDate] || dayjs.utc(observationDate, "MM/DD/YYYY"),
                        goal_id: goal.id,
                        target_id: target.id,
                        data_type: target.data_type,
                    });
                })
            )
                .then(() => {
                    Logger.debug("saved");
                    navigation.navigate("Home");
                })
                .catch((error) => {
                    Logger.error("Error while saving: ", error);
                    Sentry.Browser.captureException(error);
                });
        }
    };

    return (
        <View style={styles.actions}>
            <Button
                onPress={navigation.goBack}
                style={{ margin: 0, padding: 0 }}
                labelStyle={styles.actionButton}
                compact={true}
            >
                Cancel
            </Button>
            <Button
                onPress={save}
                style={{ margin: 0, padding: 0 }}
                labelStyle={[styles.actionButton, styles.primaryButton]}
                compact={true}
            >
                Save
            </Button>
        </View>
    );
};

ActionButtons.propTypes = {
    goal: PropTypes.object.isRequired,
    observationDate: PropTypes.string.isRequired,
    observationTargets: PropTypes.object,
    navigation: PropTypes.object.isRequired,
    datesRefs: PropTypes.object,
};

const EnterObservation = ({ route, navigation }) => {
    const { goal } = route.params;

    const [observationTargets, setObservationTargets] = useState(null);
    const [observationDate, setObservationDate] = useState(fmtDate(new Date().toString()));
    const [prevGoal, setPrevGoal] = useState(null);

    if (goal !== prevGoal) {
        const initialTargetsState = goal.targets.reduce((goalTargets, target) => {
            goalTargets[target.id] = {
                name: target.name,
                value: "",
            };
            return goalTargets;
        }, {});
        setObservationTargets(initialTargetsState);
        setPrevGoal(goal);
    }

    const datesRefs = goal.observationsDatesUntilNow().reduce((refs, date) => {
        if (!refs[fmtDate(date)]) refs[fmtDate(date)] = date;
        return refs;
    }, {});

    return (
        <AppView>
            <Surface style={[styles.container, styles.noBoxShadow]}>
                <ActionButtons
                    goal={goal}
                    observationDate={observationDate}
                    observationTargets={observationTargets}
                    navigation={navigation}
                    datesRefs={datesRefs}
                />
                <Title style={styles.headline}>{goal.name}</Title>
                <TargetEntriesWithDate
                    goal={goal}
                    observationDate={observationDate}
                    setObservationDate={setObservationDate}
                    observationTargets={observationTargets}
                    setObservationTargets={setObservationTargets}
                    datesRefs={datesRefs}
                />
            </Surface>
        </AppView>
    );
};

EnterObservation.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

export default EnterObservation;
