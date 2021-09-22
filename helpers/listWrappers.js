import { Divider } from "react-native-paper";
import { View } from "react-native";
import React from "react";

const itemsWithDividers = (items, ListItem, dynamicProps) => {
  return items.map((item, i) => {
    return (
      <View key={i}>
        <ListItem item={item} {...dynamicProps} />
        {i == items.length - 1 ? undefined : <Divider />}
      </View>
    );
  });
};

const itemsWithOutDividers = (items, ListItem, dynamicProps) => {
  return items.map((item, i) => {
    return (
      <View key={i}>
        <ListItem item={item} {...dynamicProps} />
      </View>
    );
  });
};
export { itemsWithDividers, itemsWithOutDividers };
