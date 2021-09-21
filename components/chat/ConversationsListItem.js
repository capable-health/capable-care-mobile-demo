import { View, Text, TouchableOpacity, Image } from "react-native";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import styles from "../../styles/capableStyle";

const conversationSubscriptions = {};

export default function ConversationsListItem(navigation, author, resortConversationList) {
    const Item = ({ item: conversation }) => {
        const [conversationTitle, setConversationTitle] = useState("loading...");

        // Friendly name OR last unread message
        async function refreshConversationTitle(body) {
            if (!body) {
                const messages = await conversation.getMessages();
                body = messages.items?.pop()?.body;
            }
            setConversationTitle(conversation.friendlyName || body || "Empty conversation");
        }

        refreshConversationTitle();

        const navigateToConversationView = () => {
            navigation.navigate("Conversation", { author, conversationProxy: conversation });
        };

        if (!conversationSubscriptions[conversation.sid]) {
            conversation.on("messageAdded", ({ body }) => {
                refreshConversationTitle(body);
                resortConversationList(conversation);
            });
            conversationSubscriptions[conversation.sid] = true;
        }

        return (
            <TouchableOpacity
                style={[styles.card, styles.spacing]}
                onPress={navigateToConversationView}
            >
                <View
                    style={{
                        width: "100%",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text style={styles.bold}>{conversationTitle}</Text>
                    <Image
                        style={styles.arrowIcon}
                        source={require("../../assets/icon-arrow.png")}
                        resizeMode={"contain"}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    Item.propTypes = {
        item: PropTypes.object,
    };

    return Item;
}
