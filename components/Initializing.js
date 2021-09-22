import { ActivityIndicator, View } from "react-native";
import React from "react";

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000C7" />
    </View>
  );
};

export default Initializing;
