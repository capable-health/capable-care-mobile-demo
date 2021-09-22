import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { PropTypes } from "prop-types";
import { useWindowDimensions } from "react-native";
import HTML from "react-native-render-html";
import React from "react";

const tagsStyles = {
  body: {
    paddingVertical: 0,
    margin: 0,
    color: "#000",
  },
  h1: {
    marginBottom: 15,
    marginTop: 0,
    fontSize: 24,
    lineHeight: 30,
  },
  h2: {
    marginBottom: 15,
    marginTop: 0,
    fontSize: 20,
    lineHeight: 28,
  },
  h3: {
    marginBottom: 15,
    marginTop: 0,
    fontSize: 18,
    lineHeight: 24,
  },
  p: {
    marginBottom: 15,
    marginTop: 0,
    fontSize: 16,
    lineHeight: 22,
  },
  ol: {
    marginVertical: 0,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  ul: {
    marginVertical: 0,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  li: {
    marginVertical: 0,
    marginHorizontal: 0,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  a: {
    color: "#0000C7",
  },
  strong: {
    fontWeight: "600",
  },
  b: {
    fontWeight: "600",
  },
  em: {
    fontStyle: "italic",
  },
  i: {
    fontStyle: "italic",
  },
};

const ContentfulRichText = ({ doc }) => {
  const htmlString = documentToHtmlString(doc);
  const { width } = useWindowDimensions();
  return <HTML source={{ html: htmlString }} contentWidth={width} tagsStyles={tagsStyles} />;
};

ContentfulRichText.propTypes = {
  doc: PropTypes.object.isRequired,
};

export default ContentfulRichText;
