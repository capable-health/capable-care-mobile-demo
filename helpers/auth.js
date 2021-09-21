import Constants from "expo-constants";

export const isPasswordless = () => Constants.manifest.extra.PASSWORDLESS_AUTH == 1;
