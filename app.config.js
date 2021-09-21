/* eslint-disable no-undef */
import "dotenv/config";

export default () => {
    return {
        name: "capable-care",
        slug: "capable-care",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#0000C7",
        },
        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#0000C7",
            },
        },
        web: {
            favicon: "./assets/favicon.png",
        },
        scheme: "myapp",
        sdkVersion: "41.0.0",
        extra: {
            AWS_REGION: process.env.AWS_REGION,
            USER_POOL_ID: process.env.USER_POOL_ID,
            USER_POOL_WEB_CLIENT_ID: process.env.USER_POOL_WEB_CLIENT_ID,
            PASSWORDLESS_AUTH: process.env.PASSWORDLESS_AUTH,
            API_URL: process.env.API_URL,
            SENTRY_DSN: process.env.SENTRY_DSN,
            CH_ENV: process.env.CH_ENV,
            CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
            CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
            templates: {
                CARE_PLAN_TEMPLATE_EXTERNAL_ID: process.env.CARE_PLAN_TEMPLATE_EXTERNAL_ID,
                GOAL_TEMPLATE_EXTERNAL_IDS: process.env.GOAL_TEMPLATE_EXTERNAL_IDS
                    ? process.env.GOAL_TEMPLATE_EXTERNAL_IDS.split(",")
                    : [],
                TASK_TEMPLATE_EXTERNAL_IDS: process.env.TASK_TEMPLATE_EXTERNAL_IDS
                    ? process.env.TASK_TEMPLATE_EXTERNAL_IDS.split(",")
                    : [],
            },
        },
    };
};
