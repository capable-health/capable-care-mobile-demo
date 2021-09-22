import { Provider as PaperProvider } from "react-native-paper";
import AwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";
import React from "react";

import { AuthProvider } from "./contexts/auth";
import { ErrorProvider } from "./contexts/error";
import AppContainer from "./routes/AppContainer";
import theme from "./styles/theme";

const App = function () {
  // Load Custom Fonts
  let [fontsLoaded] = useFonts({
    RubikRegular: require("./assets/fonts/Rubik-Regular.ttf"),
    RubikMedium: require("./assets/fonts/Rubik-Medium.ttf"),
    RubikSemiBold: require("./assets/fonts/Rubik-SemiBold.ttf"),
    RubikBold: require("./assets/fonts/Rubik-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000C7" />
      </View>
    );
  } else {
    return (
      <PaperProvider
        theme={theme.CombinedDefaultTheme}
        settings={{
          // eslint-disable-next-line react/display-name
          icon: (props) => <AwesomeIcon {...props} />,
        }}
      >
        <ErrorProvider>
          <AuthProvider>
            <AppContainer />
          </AuthProvider>
        </ErrorProvider>
      </PaperProvider>
    );
  }
};

export default App;
