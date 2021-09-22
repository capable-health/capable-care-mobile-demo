import { Paragraph } from "react-native-paper";
import { PropTypes } from "prop-types";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";
import styles from "../../styles/capableStyle";

const MessageBubble = ({ direction, message, authorName }) => {
  const messsageItem =
    direction === "incoming"
      ? [styles.messsageItem, styles.messsageItemRecieved]
      : styles.messsageItem;

  return (
    <View id={message.sid} style={messsageItem}>
      <View style={styles.messageHeader}>
        <Icon size={16} name={"comment"} />
        <Text style={styles.messageAuthor}>{` ${authorName || message.author}`}</Text>
      </View>
      <View>
        <Paragraph style={styles.messageText}>{message.body}</Paragraph>
        <Text style={styles.messageTime}>{message.state.timestamp.toLocaleString()}</Text>
      </View>
    </View>
  );
};

MessageBubble.propTypes = {
  direction: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  authorName: PropTypes.string,
};

export default MessageBubble;
