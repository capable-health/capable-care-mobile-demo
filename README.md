# Capable Care reference implementation

This repository provides a working example of a React Native mobile application (built on [Expo](https://expo.dev/)) integrating Capable Health's authentication mechanism and the patient API endpoints: care plans, goals, and tasks. For more information on Capable Health's API, [see the documentation and API specification](https://docs.capablehealth.com/).

## Running the demo Locally

1.  A few prerequisites you should install on your OS:

    - a recent Node version (v12+),
    - the yarn Node package manager

2.  Ensure your [local environment variables](https://github.com/capable-health/capable-care-mobile-demo/blob/dev/.env.sample) are set correctly. Copy the included `.env.sample` file to a `.env` file and add the values provided by the Capable Health team.

    NB: if you make changes to the .env file, make sure to restart your server to have them picked up by the server.

3.  Then install your dependencies and run the app:

    ```bash
    yarn install
    yarn run start
    ```

4.  Upon successfully starting the app you will be brought into the Metro Bundler's React Native dashboard. From there you'll have links that will enable you to see the app:

- in an [iOS emulator](https://docs.expo.dev/workflow/ios-simulator/), or an
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/), or
- an actual iOS or Android device through the [Expo app](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-ios-and), or
- on the web by clicking on the web option in the Metro Bundler's UI

## Contributing guidelines

If you would like to contribute to this repository, please see our [CONTRIBUTING.md](CONTRIBUTING.md) guidelines.

## Trademark notice

"Capable Health" and "Capable Care" are registered trademarks of Capable Health, Inc ("Capable"). You may not use these trademarks to infer that your product or service is endorsed or associated with Capable without permission. You may use these marks to refer to Capable in a way where it’s clear that you’re simply referring to the project, not claiming endorsement or association.
