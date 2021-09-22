import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Platform, Image } from "react-native";
import React from "react";

import {
  Home,
  Chat,
  Conversation,
  Me,
  GoalView,
  EnterObservation,
  CarePlanView,
} from "../../screens";

const Tab = createBottomTabNavigator();

/* eslint-disable react/prop-types */

const Navigator = () => {
  const hiddenTab = {
    tabBarButton: () => null,
    tabBarVisible: false,
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        /* eslint-disable no-unused-vars */
        tabBarIcon: function tabBarIcon({ focused, color, size }) {
          let iconName;
          if (route.name == "Home") {
            iconName = require("../../assets/icon-nav-home.png");
          } else if (route.name == "Chat") {
            iconName = require("../../assets/icon-nav-community.png");
          } else if (route.name == "Profile") {
            iconName = require("../../assets/icon-nav-profile.png");
          }
          return (
            <Image
              source={iconName}
              style={[styles.navIcon, focused ? styles.active : null]}
              resizeMode={"contain"}
            />
          );
        },
        /* eslint-enable no-unused-vars */
      })}
      tabBarOptions={{
        activeTintColor: "#000",
        inactiveTintColor: "#999",
        labelPosition: "below-icon",
        allowFontScaling: false,
        labelStyle: {
          fontSize: 10,
          fontFamily: "RubikRegular",
          ...Platform.select({
            web: {
              paddingBottom: 12,
            },
            default: {
              paddingBottom: 4,
            },
          }),
        },
        style: {
          height: 90,
          marginLeft: "auto",
          marginRight: "auto",
          ...Platform.select({
            web: {
              height: 65,
              width: 375,
              position: "fixed",
              borderWidth: 0,
              bottom: 0,
            },
            default: {
              width: "100%",
              shadowColor: "rgb(2, 2, 40)",
              shadowOffset: {
                width: 0,
                height: -3,
              },
              shadowOpacity: 0.08,
            },
          }),
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Me} />
      <Tab.Screen name="Conversation" component={Conversation} options={hiddenTab} />
      <Tab.Screen name="GoalView" component={GoalView} options={hiddenTab} />
      <Tab.Screen name="EnterObservation" component={EnterObservation} options={hiddenTab} />
      <Tab.Screen name="CarePlanView" component={CarePlanView} options={hiddenTab} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navIcon: {
    width: 26,
    height: 22,
    opacity: 0.3,
    marginTop: 6,
  },
  active: {
    opacity: 1,
  },
});

export default Navigator;
