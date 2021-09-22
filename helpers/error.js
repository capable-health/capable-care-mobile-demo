import * as Sentry from "sentry-expo";
import Logger from "js-logger";

export const captureError = (extraInfo, e) => {
  Logger.error(extraInfo, e);
  Sentry.Browser.captureException(e);
};
