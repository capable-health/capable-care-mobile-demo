import { Appbar } from "react-native-paper";
import { PropTypes } from "prop-types";
import { useRoute } from "@react-navigation/native";
import Logger from "js-logger";
import React from "react";

import NavItem from "../components/NavItem";
import styles from "../styles/capableStyle";

const NavBar = ({ navigation }) => {
  const route = useRoute();
  const homeScreenRoutes = ["Home", "GoalView", "EnterObservation"];
  const communityRoutes = ["Chat", "Conversation"];
  Logger.log(route.name);

  return (
    <Appbar style={styles.navBarContainer}>
      <Appbar.Header style={styles.navBar}>
        <NavItem
          title="Home"
          icon="home"
          activeState={homeScreenRoutes.includes(route.name) ? true : false}
          onPress={() => navigation.navigate("Home")}
        />
        <NavItem
          title="Chat"
          icon="community"
          activeState={communityRoutes.includes(route.name) ? true : false}
          onPress={() => navigation.navigate("Chat")}
        />
        <NavItem
          title="Profile"
          icon="profile"
          activeState={route.name == "Me" ? true : false}
          onPress={() => navigation.navigate("Me")}
        />
      </Appbar.Header>
    </Appbar>
  );
};

NavBar.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default NavBar;
