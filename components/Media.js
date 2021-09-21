import { Image } from "react-native";
import { PropTypes } from "prop-types";
import { Video } from "expo-av";
import React from "react";

import styles from "../styles/capableStyle";

const Media = ({ mediaSource, isVideo }) => {
    const video = React.useRef(null);

    return isVideo ? (
        <Video
            source={mediaSource}
            style={{ width: 375, height: video.height }}
            ref={video}
            resizeMode={"cover"}
            isLooping
            isMuted
            onLoad={() => {
                video.current.playAsync();
            }}
        />
    ) : (
        <Image source={mediaSource} style={styles.goalHeaderImage} />
    );
};

Media.propTypes = {
    mediaSource: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    isVideo: PropTypes.bool,
};

export default Media;
