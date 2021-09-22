import Constants from "expo-constants";
import Logger from "js-logger";

const { createClient } = require("contentful/dist/contentful.browser.min.js");

const apiKeysPresent = Boolean(
  Constants.manifest.extra.CONTENTFUL_SPACE_ID && Constants.manifest.extra.CONTENTFUL_DELIVERY_TOKEN
);

const client = apiKeysPresent
  ? createClient({
      space: Constants.manifest.extra.CONTENTFUL_SPACE_ID,
      accessToken: Constants.manifest.extra.CONTENTFUL_DELIVERY_TOKEN,
    })
  : null;

const retrieveEntry = (contentful_entry_id) => {
  return new Promise((resolve, reject) => {
    if (!client) return reject("Missing Contentful API keys");
    client
      .getEntry(contentful_entry_id)
      .then((entry) => {
        return resolve(entry.fields);
      })
      .catch((err) => Logger.error("Contentful request failed: ", err));
  });
};

export { retrieveEntry };
