import { PropTypes } from "prop-types";
import { Image, View } from "react-native";
import md5 from "blueimp-md5";
import React from "react";

const GRAVATAR_URI = "https://www.gravatar.com/avatar/";

const getStyle = (size, borderStyle) => {
    const avatarSize = { width: size / 2, height: size / 2 };
    let border = {};

    if (borderStyle === "circle") {
        border = { borderRadius: avatarSize.width / 2 };
    } else if (borderStyle === "rounded") {
        border = { borderRadius: avatarSize.width / 20 };
    }

    return { ...avatarSize, ...border };
};

const queryString = (params) =>
    "?" +
    Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");

const Gravatar = ({
    email,
    size = 80,
    style,
    borderStyle = "circle",
    defaultImage = "https://i.imgur.com/Dkzx1as.png",
    rating = "g",
    resizeMode = "contain",
    ...props
}) => {
    const uri = `${GRAVATAR_URI}${md5(email)}${queryString({
        size,
        d: defaultImage,
        rating,
    })}`;

    const innerStyle = getStyle(size, borderStyle);

    return (
        <View style={{ overflow: "hidden" }}>
            <Image
                {...props}
                source={{ uri }}
                style={[innerStyle, style]}
                resizeMode={resizeMode}
            />
        </View>
    );
};

Gravatar.propTypes = {
    email: PropTypes.string.isRequired,
    size: PropTypes.number,
    style: PropTypes.object,
    borderStyle: PropTypes.string,
    defaultImage: PropTypes.string,
    rating: PropTypes.string,
    resizeMode: PropTypes.string,
};

export default Gravatar;
