import { PropTypes } from "prop-types";
import MessageBubble from "./MessageBubble";
import React from "react";

export default function ConversationsMessages({ messages, identity, authorName }) {
    return (
        <>
            {messages.map((message) => {
                if (message.author === identity)
                    return (
                        <MessageBubble
                            key={message.index}
                            direction="outgoing"
                            message={message}
                            authorName={authorName}
                        />
                    );
                else
                    return (
                        <MessageBubble key={message.index} direction="incoming" message={message} />
                    );
            })}
        </>
    );
}

ConversationsMessages.propTypes = {
    messages: PropTypes.array.isRequired,
    identity: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
};
