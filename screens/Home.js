import { PropTypes } from "prop-types";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import {
    View,
    Image,
    Text,
    Pressable,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome5";
import React, { useEffect, useState } from "react";
import {
    Headline,
    Title,
    Divider,
    Paragraph,
    Button,
    Dialog,
    Portal,
    ProgressBar,
} from "react-native-paper";

import { AppView, GoalOverview } from "../components";
import { CarePlan, Patient, Goal, Task } from "../capable";
import { dayjs } from "../helpers/dayjs";
import { itemsWithOutDividers } from "../helpers/listWrappers";
import { retrieveEntry } from "../helpers/contentAPI";
import Gravatar from "../components/gravatar";
import ObservationRow from "../components/ObservationRow";
import styles from "../styles/capableStyle";

const Weeks = [
    {
        id: 1,
        title: "Week 1",
    },
    {
        id: 2,
        title: "Week 2",
    },
    {
        id: 3,
        title: "Week 3",
    },
    {
        id: 4,
        title: "Week 4",
    },
];

const filterBySelectedWeek = (list, selectedWeek) => {
    return list.filter((item) => item.tag_list.includes(`Week ${selectedWeek}`));
};

const filterOutByStatuses = (list, statuses) => {
    return list.filter((item) => !statuses.includes(item.achievement_status));
};

const filterList = (list, week) => {
    const filteredByWeek = filterBySelectedWeek(list, week);
    const filteredByStatus = filterOutByStatuses(filteredByWeek, ["not_attainable"]);
    return filteredByStatus;
};

const HomeHeader = ({ patient }) => {
    return (
        <View style={styles.homeHeader}>
            <Image source={require("../assets/home-header.jpg")} style={styles.headerImage} />
            <Gravatar
                style={StyleSheet.flatten(styles.avatar)}
                size={160}
                email={patient.email_strip_plus}
            />
            <Headline style={styles.greeting}>
                Welcome{patient.name ? `, ${patient.name}` : ""}!
            </Headline>
        </View>
    );
};

HomeHeader.propTypes = {
    patient: PropTypes.object.isRequired,
};

const CarePlanOverview = ({ carePlan, selectedWeek, onSelectWeek, navigation }) => {
    const Item = ({ item, onPress, borderColor, textColor, fontFamily }) => (
        <TouchableOpacity onPress={onPress} style={[styles.tab, { borderColor }]}>
            <Text style={[styles.title, { color: textColor, fontFamily: fontFamily }]}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    Item.propTypes = {
        item: PropTypes.object.isRequired,
        onPress: PropTypes.func,
        borderColor: PropTypes.string,
        textColor: PropTypes.string,
        fontFamily: PropTypes.string,
    };

    const renderItem = ({ item }) => {
        const borderColor = item.id === selectedWeek ? "#0000C7" : "#FFFFFF";
        const color = item.id === selectedWeek ? "#0000C7" : "black";
        const fontFamily = item.id === selectedWeek ? "RubikMedium" : "RubikRegular";

        return (
            <Item
                item={item}
                onPress={() => onSelectWeek(item.id)}
                borderColor={borderColor}
                textColor={color}
                fontFamily={fontFamily}
            />
        );
    };

    const navigateToCarePlanView = () => {
        navigation.navigate("CarePlanView", { carePlan: carePlan });
    };

    return (
        <View style={[styles.container, styles.lightBoxShadow]}>
            <Text style={styles.eyebrow}>Current Plan</Text>

            <Pressable onPress={navigateToCarePlanView} style={styles.arrowLink}>
                <Title style={styles.headline}>{carePlan.name}</Title>
                <Image
                    style={[styles.arrowIcon, { marginBottom: 16 }]}
                    source={require("../assets/icon-arrow.png")}
                    resizeMode={"contain"}
                />
            </Pressable>

            <FlatList
                data={Weeks}
                extraData={selectedWeek}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                style={styles.tabs}
            />
        </View>
    );
};

CarePlanOverview.propTypes = {
    carePlan: PropTypes.object.isRequired,
    selectedWeek: PropTypes.number.isRequired,
    onSelectWeek: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
};

const GoalMostRecentCompoundObservation = ({ item }) => {
    if (item.realObservations().length == 0) return null;
    if (Object.keys(item.mostRecentObservations()).length === 0) return null;
    const observationTargets = Object.values(item.observationsGroupBy("observed_date"));
    const mostRecentDateObservations = observationTargets[observationTargets.length - 1];
    const mostRecentObservations = Goal.mostRecentObservationsByDay(mostRecentDateObservations);
    return (
        <View>
            <Divider style={{ marginTop: 16 }} />
            <View style={styles.divider}>
                <Title style={styles.cardSubHead}>Last Log</Title>
                <ObservationRow observationTargets={mostRecentObservations} />
            </View>
        </View>
    );
};

GoalMostRecentCompoundObservation.propTypes = {
    item: PropTypes.object.isRequired,
};

const GoalListItem = ({ item }) => {
    const navigation = useNavigation();
    const navigateToGoalView = () => {
        navigation.navigate("GoalView", { goal: item });
    };
    return (
        <Pressable style={styles.cardContainer} onPress={navigateToGoalView}>
            <View style={[styles.card, styles.cardGoals]}>
                <View style={styles.progressBar}>
                    <ProgressBar
                        progress={0.5}
                        color={"#0000C7"}
                        style={{ height: 8, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
                        indeterminate={false}
                    />
                </View>
                <View style={{ width: "100%" }}>
                    <GoalOverview goal={item} />
                    <GoalMostRecentCompoundObservation item={item} />
                </View>
            </View>
        </Pressable>
    );
};

GoalListItem.propTypes = {
    item: PropTypes.object.isRequired,
};

const GoalsList = ({ goals, week }) => {
    const filteredGoals = filterList(goals, week);
    const numberOfExercises = `1/${filteredGoals.length} Completed`;
    return (
        <View style={[styles.container, { paddingBottom: 0 }]}>
            <View style={styles.heading}>
                <Headline style={styles.h2}>Goals</Headline>
                <Text style={styles.paragraph}>{numberOfExercises}</Text>
            </View>
            <View style={{ marginHorizontal: -24 }}>
                <ScrollView
                    style={styles.cards}
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={345}
                    snapToAlignment={"left"}
                >
                    {itemsWithOutDividers(filteredGoals, GoalListItem)}
                </ScrollView>
            </View>
        </View>
    );
};

GoalsList.propTypes = {
    goals: PropTypes.array.isRequired,
    week: PropTypes.number,
};

const TaskListItem = ({ item, toggleTaskStatus }) => {
    const onTaskPressed = () => {
        toggleTaskStatus(item);
    };
    return (
        <Pressable style={[styles.card, styles.toDoItem]} onPress={onTaskPressed}>
            <View
                style={{
                    width: 32,
                    marginRight: 24,
                    marginLeft: 8,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Pressable
                    style={
                        item.isCompleted
                            ? [styles.toDoCheckbox, styles.taskComplete]
                            : styles.toDoCheckbox
                    }
                    onPress={onTaskPressed}
                >
                    <Icon
                        name={item.isCompleted ? "check" : ""}
                        style={{ fontSize: 16, color: "#FFF" }}
                    />
                </Pressable>
            </View>
            <View style={{ flex: 5 }}>
                <Title style={styles.cardTitle}>{item.name}</Title>
                <View style={styles.cardStat}>
                    <Icon name="calendar-alt" style={{ marginRight: 8 }} />
                    <Text style={styles.cardStatLabel}>
                        {item.due_on ? `Due by ${dayjs.utc(item.due_on).format("M/DD/YY")}` : ""}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

TaskListItem.propTypes = {
    item: PropTypes.object.isRequired,
    toggleTaskStatus: PropTypes.func.isRequired,
};

const TaskList = ({ tasks, week, toggleTaskStatus }) => {
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const filteredTasks = filterList(tasks, week);

    const dynamicProps = { toggleTaskStatus: toggleTaskStatus };

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Headline style={styles.h2}>To Do&rsquo;s</Headline>
                <Button labelStyle={styles.button} icon="plus" onPress={showDialog}>
                    Add To Do
                </Button>
            </View>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
                    <Image
                        source={require("../assets/icon-rocket.png")}
                        style={{ height: 24, width: 24, marginBottom: 10, opacity: 0.5 }}
                        resizeMode={"contain"}
                    />
                    <Dialog.Title style={styles.dialogTitle}>
                        Increase Patient Engagement
                    </Dialog.Title>
                    <Dialog.Content style={styles.dialogContent}>
                        <Paragraph style={[styles.paragraph, { textAlign: "center" }]}>
                            Allow patients to add their own tasks to their Care Plan
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog} mode="contained" style={{ width: 100 }}>
                            Ok
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <View>{itemsWithOutDividers(filteredTasks, TaskListItem, dynamicProps)}</View>
        </View>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    week: PropTypes.number,
    toggleTaskStatus: PropTypes.func,
};

const Home = ({ navigation }) => {
    const [patient, setPatient] = useState(new Patient());
    const [carePlan, setCarePlan] = useState(new CarePlan());
    const [goals, setGoals] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(1);
    const isFocused = useIsFocused();

    useEffect(() => {
        Patient.me().then((patient) => {
            setPatient(patient);
        });

        CarePlan.ensureExistOrCreate(
            Constants.manifest.extra.templates.CARE_PLAN_TEMPLATE_EXTERNAL_ID,
            Constants.manifest.extra.templates.GOAL_TEMPLATE_EXTERNAL_IDS,
            Constants.manifest.extra.templates.TASK_TEMPLATE_EXTERNAL_IDS
        ).then((currentCarePlan) => {
            if (currentCarePlan.cms_entry_id?.length > 0) {
                retrieveEntry(currentCarePlan.cms_entry_id)
                    .then((contentfulEntry) => {
                        currentCarePlan.name = contentfulEntry.title;
                        currentCarePlan.imageUrl = `https:${contentfulEntry.headerImage.fields.file.url}`;
                        currentCarePlan.description = contentfulEntry.description;
                    })
                    .finally(() => setCarePlan(currentCarePlan));
            } else {
                setCarePlan(currentCarePlan);
            }
        });

        Goal.getList().then((currentGoals) => {
            let goalPromises = [];
            currentGoals.forEach((goal) => {
                if (goal.cms_entry_id?.length > 0) {
                    goalPromises.push(
                        new Promise((resolve) => {
                            retrieveEntry(goal.cms_entry_id)
                                .then((contentfulEntry) => {
                                    goal.name = contentfulEntry.title;
                                    goal.imageUrl = `https:${contentfulEntry.headerImage.fields.file.url}`;
                                    goal.description = contentfulEntry.description;
                                    resolve();
                                })
                                .catch((err) => Promise.reject(err));
                        })
                    );
                }
            });

            Promise.all(goalPromises).finally(() => {
                setGoals(currentGoals);
            });
        });

        Task.getList().then((currentTasks) => {
            let taskPromises = [];
            currentTasks.forEach((task) => {
                if (task.cms_entry_id?.length > 0) {
                    taskPromises.push(
                        new Promise((resolve) => {
                            retrieveEntry(task.cms_entry_id)
                                .then((contentfulEntry) => {
                                    task.name = contentfulEntry.title;
                                    resolve();
                                })
                                .catch((err) => Promise.reject(err));
                        })
                    );
                }
            });

            Promise.all(taskPromises).finally(() => {
                setTasks(currentTasks);
            });
        });
    }, [isFocused]);

    const toggleTaskStatus = (task) => {
        task.setStatus(Number(!task.isCompleted)).then((updatedTask) => {
            setTasks(tasks.map((task) => (task.id == updatedTask.id ? updatedTask : task)));
        });
    };

    return (
        <AppView>
            <HomeHeader patient={patient} />
            <CarePlanOverview
                carePlan={carePlan}
                selectedWeek={selectedWeek}
                onSelectWeek={setSelectedWeek}
                navigation={navigation}
            />
            <GoalsList goals={goals} week={selectedWeek} />
            <TaskList tasks={tasks} week={selectedWeek} toggleTaskStatus={toggleTaskStatus} />
        </AppView>
    );
};

Home.propTypes = {
    navigation: PropTypes.object,
};

export default Home;
