import { Platform, StyleSheet } from "react-native";
const blue = "#0000C7";
const grey = "#73778C";
const black = "#020228";
const ww = 375;
const pad = 24;

export default StyleSheet.create({
    /* Structure
    -------------------------------------- */
    wrapper: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "hidden",
        height: "100%",
        width: "100%",
    },

    lightBg: {
        backgroundColor: "#FAFAFA",
        ...Platform.select({
            web: {
                paddingBottom: 60,
            },
        }),
    },

    main: {
        flexDirection: "column",
        justifyContent: "flex-start",
        flex: 1,
        alignItems: "center",
        width: 375,
        backgroundColor: "#FAFAFA",
        position: "relative",
    },

    menuItem: {
        marginHorizontal: 24,
    },

    container: {
        maxWidth: ww,
        width: "100%",
        padding: pad,
    },
    surface: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    /* General Styles
    -------------------------------------- */

    spacing: {
        marginVertical: 6,
    },

    verticalSpace: {
        marginVertical: 4,
    },

    divider: {
        marginTop: 16,
        flexDirection: "row",
        flexWrap: "wrap",
    },

    bold: {
        fontWeight: "500",
    },

    videoIcon: {
        width: 20,
        height: 20,
    },

    profileIcon: {
        width: 50,
        height: 50,
    },

    arrowIcon: {
        width: 10,
        height: 10,
    },

    noBottomPadding: {
        paddingBottom: 0,
    },

    lightBoxShadow: {
        backgroundColor: "#FFF",
        ...Platform.select({
            web: {
                boxShadow: "0px 4px 6px rgba(2, 2, 40, 0.08)",
            },
            default: {
                shadowColor: "rgb(2, 2, 40)",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.08,
                elevation: 4,
            },
        }),
    },

    noBoxShadow: {
        shadowColor: "transparent",
    },

    /* Home Screen
    -------------------------------------- */
    homeHeader: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        maxWidth: ww,
        width: "100%",
        backgroundColor: blue,
        ...Platform.select({
            web: {
                paddingTop: 0,
            },
            default: {
                paddingTop: 40,
            },
        }),
    },
    headerImage: {
        height: 127,
        maxWidth: ww,
        width: "100%",
        position: "absolute",
        ...Platform.select({
            web: {
                top: 0,
            },
            default: {
                top: 40,
            },
        }),
        right: 0,
        resizeMode: "contain",
    },
    avatar: {
        marginTop: 48,
        marginLeft: pad,
    },
    greeting: {
        color: blue,
        backgroundColor: "#FFF",
        textTransform: "capitalize",
        letterSpacing: -0.005,
        paddingTop: 16,
        paddingHorizontal: pad,
        fontSize: 16,
        width: "100%",
        marginBottom: -1,
        marginTop: -1,
        fontFamily: "RubikMedium",
    },
    eyebrow: {
        fontSize: 12,
        lineHeight: 14,
        marginBottom: 4,
        color: grey,
        fontFamily: "RubikRegular",
    },
    headline: {
        color: black,
        fontSize: 20,
        lineHeight: 24,
        paddingBottom: 16,
        letterSpacing: -0.25,
        fontFamily: "RubikMedium",
    },
    h2: {
        fontSize: 16,
        lineHeight: 16,
        padding: 0,
        margin: 0,
        color: black,
        fontFamily: "RubikRegular",
    },
    heading: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 8,
    },
    button: {
        color: blue,
        fontSize: 14,
        textTransform: "capitalize",
        letterSpacing: 0,
        padding: 0,
        fontFamily: "RubikMedium",
    },

    paragraph: {
        fontFamily: "RubikRegular",
    },

    whiteBtn: {
        color: "#FFF",
        paddingVertical: 2,
    },

    /* Modal Dialog
    -------------------------------------- */
    dialog: {
        width: 330,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: 24,
        marginLeft: "auto",
        marginRight: "auto",
    },

    dialogTitle: {
        marginVertical: 0,
        marginHorizontal: 0,
        padding: 0,
        fontSize: 18,
        width: "100%",
        marginBottom: 8,
        marginTop: 16,
        textAlign: "center",
        fontFamily: "RubikRegular",
    },

    dialogContent: {
        marginVertical: 0,
        marginHorizontal: 0,
        paddingLeft: 0,
        paddingRight: 0,
        width: "100%",
        fontFamily: "RubikRegular",
    },

    /* Cards - Goals Section
    -------------------------------------- */
    goalHeaderImage: {
        width: ww,
        height: 304,
    },

    cards: {
        paddingHorizontal: 8,
    },

    cardContainer: {
        padding: 8,
        width: 345,
        flex: 1,
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 16,
        flex: 1,
        ...Platform.select({
            web: {
                boxShadow: ["0px 1px 1px rgba(0, 0, 0, 0.07), 0px 2px 8px rgba(0, 0, 0, 0.06)"],
                overflow: "hidden",
                cursor: "pointer",
            },
            default: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.15,
                elevation: 4,
            },
        }),
    },

    cardTitle: {
        color: black,
        fontFamily: "RubikRegular",
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 8,
        marginTop: 0,
        width: "100%",
    },

    goalTitle: {
        fontSize: 16,
        marginBottom: 16,
    },

    cardStat: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardStatLabel: {
        marginRight: 12,
        color: "#73778C",
        fontSize: 12,
        fontFamily: "RubikRegular",
    },

    cardStatIcon: {
        color: "#000",
        marginRight: 6,
    },

    cardSubHead: {
        textTransform: "uppercase",
        letterSpacing: -0.005,
        width: "100%",
        fontSize: 12,
        lineHeight: 14,
        margin: 0,
        paddingBottom: 8,
        fontFamily: "RubikRegular",
    },

    progressBar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },

    /* To Do's
    -------------------------------------- */
    toDoItem: {
        marginBottom: 12,
    },

    toDoCheckbox: {
        ...Platform.select({
            web: {
                boxShadow: ["0px 1px 1px rgba(0, 0, 0, 0.07), 0px 2px 8px rgba(0, 0, 0, 0.06)"],
                overflow: "hidden",
            },
            default: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.1,
                elevation: 4,
            },
        }),
        borderRadius: 32,
        height: 32,
        width: 32,
        minWidth: 32,
        padding: 0,
        backgroundColor: "#FFF",
        color: black,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DFDFDF",
    },

    taskComplete: {
        backgroundColor: "#21DA11",
    },

    /* Tabs - Weeks
    -------------------------------------- */
    tabs: {
        flexDirection: "row",
        marginBottom: -24,
        marginTop: 16,
    },

    tab: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 8,
        paddingBottom: 12,
        marginRight: 20,
        borderBottomWidth: 2,
        backgroundColor: "transparent",
    },

    /* Enter Observations Screen
    ---------------------------------------- */
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40,
        marginBottom: 40,
        ...Platform.select({
            web: {
                marginTop: 0,
            },
            default: {
                marginTop: 40,
            },
        }),
    },

    actionButton: {
        color: "#999",
        letterSpacing: 0.003,
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        marginTop: 0,
        textTransform: "capitalize",
    },

    primaryButton: {
        color: "#0000C7",
    },

    observeButton: {
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 8,
        marginRight: 12,
        borderColor: "#E2E2E6",
    },

    observeButtonSelected: {
        borderColor: blue,
    },

    label: {
        marginTop: 24,
        fontWeight: "500",
        fontSize: 14,
        color: black,
    },

    textInputStyle: {
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        textAlign: "right",
        fontSize: 14,
        color: "#000",
        padding: 16,
    },

    fieldContainer: {
        borderColor: "#E2E2E6",
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 8,
    },

    leftToggleButton: {
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderColor: "#E2E2E6",
    },

    rightToggleButton: {
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderColor: "#E2E2E6",
    },

    /* Profile Screen 
    -------------------------------------- */
    profileHeader: {
        backgroundColor: blue,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        paddingBottom: 24,
        paddingTop: 48,
    },

    profileName: {
        color: "#FFF",
        paddingBottom: 4,
        paddingTop: 12,
        marginTop: 0,
        marginBottom: 0,
    },

    memberSince: {
        color: "rgba(255,255,255,.75)",
        fontWeight: "400",
        textTransform: "uppercase",
        fontSize: 10,
        lineHeight: 16,
        marginTop: 0,
        marginBottom: 0,
    },

    cardCenterItems: {
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: "space-between",
        marginVertical: 4,
    },

    teamTitle: {
        fontWeight: "400",
        fontSize: 15,
        textAlign: "left",
        width: 200,
        paddingHorizontal: 16,
    },

    profileList: {
        flexDirection: "column",
        paddingVertical: 0,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#FFF",
        ...Platform.select({
            web: {
                boxShadow: ["0px 1px 1px rgba(0, 0, 0, 0.07), 0px 2px 8px rgba(0, 0, 0, 0.06)"],
                overflow: "hidden",
            },
            default: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.125,
                elevation: 4,
            },
        }),
    },

    profileNavItem: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        paddingRight: 18,
        paddingLeft: 0,
        borderBottomColor: "#E2E2E6",
        borderBottomWidth: 1,
    },

    lastProfileNavItem: {
        borderBottomWidth: 0,
    },

    arrowLink: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        ...Platform.select({
            web: {
                cursor: "pointer",
            },
        }),
    },

    snack: {
        backgroundColor: "#F8BE39",
    },

    snackText: {
        color: "#000",
    },

    /* Chat 
    -------------------------------------- */
    chatImage: {
        width: 80,
        height: 80,
    },

    messageContainer: {
        borderColor: "#E2E2E6",
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 0,
    },

    messageTextField: {
        textAlign: "left",
        fontSize: 14,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 0,
        textAlignVertical: "top",
        width: 200,
    },

    messsageItem: {
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        width: "100%",
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#E2E2E6",
        ...Platform.select({
            web: {
                boxShadow: ["0px 1px 1px rgba(0, 0, 0, 0.07), 0px 2px 8px rgba(0, 0, 0, 0.06)"],
                overflow: "hidden",
            },
            default: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.125,
                elevation: 4,
            },
        }),
    },

    messsageItemRecieved: {
        backgroundColor: "rgba(115, 234, 163, .1)",
    },

    messageHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },

    messageAuthor: {
        marginLeft: 8,
        fontSize: 12,
    },

    messageText: {
        fontSize: 18,
        paddingVertical: 8,
    },

    messageTime: {
        fontSize: 10,
        color: "#999",
    },

    newMessage: {
        flex: 1,
    },
});
