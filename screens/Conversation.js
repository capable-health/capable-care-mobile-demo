import { Headline, Paragraph, Button } from "react-native-paper";
import { PropTypes } from "prop-types";
import { View, Image, ScrollView, TextInput } from "react-native";
import Logger from "js-logger";
import React from "react";

import BackButton from "../components/BackButton";
import ConversationsMessages from "../components/chat/ConversationsMessages";
import styles from "../styles/capableStyle";

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: "",
      conversationProxy: props.route.params.conversationProxy,
      messages: [],
      loadingState: "initializing",
      identity: props.route.params.author.id,
      authorName: props.route.params.author.name,
      boundConversations: new Set(),
    };

    this.loadMessagesFor = this.loadMessagesFor.bind(this);
    this.messageAdded = this.messageAdded.bind(this);
    this.onMessageChanged = this.onMessageChanged.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  loadMessagesFor(conversation) {
    if (this.state.conversationProxy === conversation) {
      conversation
        .getMessages()
        .then((messagePaginator) => {
          if (this.state.conversationProxy === conversation) {
            this.setState({
              messages: messagePaginator.items,
              loadingState: "connected",
            });
          }
        })
        .catch((err) => {
          // TODO: implement retry
          Logger.error("Couldn't fetch messages", err);
          this.setState({ loadingState: "failed" });
        });
    }
  }

  componentDidMount() {
    if (this.state.conversationProxy) {
      this.loadMessagesFor(this.state.conversationProxy);

      if (!this.state.boundConversations.has(this.state.conversationProxy)) {
        let newConversation = this.state.conversationProxy;
        newConversation.on("messageAdded", (m) => this.messageAdded(m, newConversation));
        this.setState({
          boundConversations: new Set([...this.state.boundConversations, newConversation]),
        });
      }
    }
  }

  componentDidUpdate(oldProps, oldState) {
    if (this.state.conversationProxy !== oldState.conversationProxy) {
      this.loadMessagesFor(this.state.conversationProxy);

      if (!this.state.boundConversations.has(this.state.conversationProxy)) {
        let newConversation = this.state.conversationProxy;
        newConversation.on("messageAdded", (m) => this.messageAdded(m, newConversation));
        this.setState({
          boundConversations: new Set([...this.state.boundConversations, newConversation]),
        });
      }
    }
  }

  static getDerivedStateFromProps(newProps, oldState) {
    const conversationProxy = newProps.route.params.conversationProxy;
    let logic =
      oldState.loadingState === "initializing" || oldState.conversationProxy !== conversationProxy;
    if (logic) {
      return { loadingState: "loading messages", conversationProxy: conversationProxy };
    } else {
      return null;
    }
  }

  messageAdded(message, targetConversation) {
    if (targetConversation === this.state.conversationProxy)
      this.setState((prevState) => ({
        messages: [...prevState.messages, message],
      }));
  }

  onMessageChanged(value) {
    this.setState({ newMessage: value });
  }

  sendMessage(event) {
    event.preventDefault();
    const message = this.state.newMessage;
    this.setState({ newMessage: "" });
    this.state.conversationProxy.sendMessage(message);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.lightBg}>
          <View style={styles.main}>
            <View style={styles.profileHeader}>
              <BackButton onPress={this.props.navigation.goBack} />
              <Image
                style={styles.chatImage}
                source={require("../assets/icon-community-white.png")}
                resizeMode={"contain"}
              />
              <Headline style={styles.profileName}>Chat</Headline>
              <Paragraph style={styles.memberSince}>{this.state.loadingState}</Paragraph>
            </View>
            <View
              style={{
                backgroundColor: "#f1f1f1",
                height: 460,
                width: "100%",
                paddingHorizontal: 16,
              }}
            >
              <ScrollView
                ref={(ref) => {
                  this.scrollView = ref;
                }}
                onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
              >
                <ConversationsMessages
                  identity={this.state.identity}
                  authorName={this.state.authorName}
                  messages={this.state.messages}
                />
              </ScrollView>
            </View>
            <View style={[styles.container, styles.newMessage]}>
              <View style={styles.messageContainer}>
                <TextInput
                  placeholder={"Type your message here..."}
                  disabled={this.state.loadingState !== "connected"}
                  onChangeText={this.onMessageChanged}
                  value={this.state.newMessage}
                  style={styles.messageTextField}
                  dense={true}
                />
                <Button
                  labelStyle={[styles.button, styles.whiteBtn]}
                  htmlType="submit"
                  icon="paper-plane"
                  type={"submit"}
                  mode="contained"
                  onPress={this.sendMessage}
                >
                  SEND
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Conversation.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default Conversation;
