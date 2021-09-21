import { PropTypes } from "prop-types";
import { Client as TwilioClient } from "@twilio/conversations";
import { Headline, Button, Paragraph } from "react-native-paper";
import { View, Image } from "react-native";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";

import { AppView } from "../components";
import { CapableClient, GET, POST } from "../capable/api";
import { captureError } from "../helpers/error";
import { itemsWithOutDividers } from "../helpers/listWrappers";
import { Patient } from "../capable";
import ConversationListItem from "../components/chat/ConversationsListItem";
import styles from "../styles/capableStyle";

function Chat({ navigation }) {
    const [me, setMe] = useState({});
    const [twilioClient, setTwilioClient] = useState(null);
    const [status, setStatus] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);

    // On first run, fetch patient, token and init conversations
    useEffect(() => {
        // initConversations
        const initConversations = async ({ twilio_auth_token }) => {
            setStatus("connecting…");
            const conversationClient = await TwilioClient.create(twilio_auth_token);
            // we need to store it in the state in order to refresh
            //  its token once it expires
            setTwilioClient(conversationClient);

            conversationClient.on("connectionStateChanged", (state) => {
                if (state === "connecting") setStatus("connecting…");
                if (state === "connected") {
                    setStatus("connected");
                }
            });

            conversationClient.on("conversationJoined", (joinedConversation) => {
                if (
                    !conversations.find(
                        (conversation) => conversation.sid === joinedConversation.sid
                    )
                ) {
                    setConversations((existingConversations) => [
                        ...existingConversations,
                        joinedConversation,
                    ]);
                }
            });

            conversationClient.on("conversationLeft", (leftConversation) => {
                setConversations((existingConversations) =>
                    existingConversations.filter(
                        (conversation) => conversation.sid !== leftConversation.sid
                    )
                );
            });
        };

        // Refresh the token and reschedule one
        const fetchToken = () => {
            setStatus("Fetching credentials…");
            const tokenPromise = CapableClient.fetch(GET, `/conversations/twilio_token`).catch(
                (e) => captureError("Failed to get twilio token: ", e)
            );
            tokenPromise.then(({ twilio_auth_token }) => {
                let expires_at = jwt_decode(twilio_auth_token).exp * 1000; // in seconds
                let now = new Date().getTime(); // in milliseconds
                setTimeout(fetchToken, expires_at - now - 10000);
                if (twilioClient) {
                    twilioClient.updateToken(twilio_auth_token);
                }
            });
            return tokenPromise;
        };

        Patient.me().then((patient) => setMe(patient));
        fetchToken().then(initConversations);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // sort conversation by last created message
    useEffect(() => {
        const sorted_conversations = conversations.sort((conversation_a, conversation_b) => {
            const date_a = conversation_a.lastMessage?.dateCreated || conversation_a.dateCreated;
            const date_b = conversation_b.lastMessage?.dateCreated || conversation_b.dateCreated;

            return date_b - date_a;
        });

        setSortedConversations(sorted_conversations);
    }, [conversations]);

    // Unable to create useEffect that looks for conversation#lastMessage
    // This function allows any new message create by one of the conversation to
    //  enforce its parent first in the conversation list
    const setFirstConversation = (conversation) => {
        setSortedConversations((sorted_conversations) => [
            conversation,
            ...sorted_conversations.filter(
                (a_conversation) => a_conversation.sid !== conversation.sid
            ),
        ]);
    };

    const ChatHeader = () => {
        return (
            <View style={styles.profileHeader}>
                <Image
                    style={styles.chatImage}
                    source={require("../assets/icon-community-white.png")}
                    resizeMode={"contain"}
                />
                <Headline style={styles.profileName}>Chat</Headline>
                <Paragraph style={styles.memberSince}>{status}</Paragraph>
            </View>
        );
    };

    return (
        <AppView>
            <ChatHeader />
            <View style={styles.container}>
                {me
                    ? itemsWithOutDividers(
                          sortedConversations,
                          ConversationListItem(navigation, me, setFirstConversation)
                      )
                    : "Loading conversations"}
            </View>
            <View style={{ paddingBottom: 30 }}>
                <Button
                    labelStyle={styles.button}
                    disabled={status !== "connected"}
                    icon="plus"
                    onPress={() => CapableClient.fetch(POST, "/conversations")}
                >
                    Create new chat
                </Button>
            </View>
        </AppView>
    );
}

Chat.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Chat;
