# Contributing Guidelines

## Branches and Naming

The main branch of this repository is called `dev` and all incomming PRs should be made against it. Please prefix your PR with (bug/chore/feature) depending on the nature of your PR. If applicable (for most cases), please link the corresponding Shortcut ticket to your PR by typing in [ch{shortcut-ticket-number}] into the description field of your PR.

Any PRs merged into `dev` get automatically deployed to a dev app hosted on Render, so please test your prs accordingly.

No prs should be merged without an approval from at least one reviewer and passing linting/formatting checks.

Before merging, make sure your PR is rebased or has pulled in the latest changes from the `dev` branch.

## Setup Your Dev Environment

1. LINTING: we use [eslint](https://eslint.org/) for linting. Please make sure that you have run `yarn run lint` and have corrected all linting issues before submitting a PR. Eslint is also available as a plugin for many code editors, we suggest that you install the [eslint plugin for your editor](https://eslint.org/docs/user-guide/integrations#editors) of choice and correct any linting errors as you go.

2. FORMATTING: we use [prettier](https://prettier.io/) to format the code in our repository. Please follow the steps to [setup your editor of choice](https://prettier.io/docs/en/editors.html) with the prettier extension so that your code meets our formatting guidelines. Alternatively, you can run `yarn run format` to format all the files in one go. If you choose that option, please make sure to do so as one separate commit.

   ### VS Code + Prettier ex:

   - Install [VS Code prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   - Include the following lines in the `settings.json` of your VS Code editor:
     ```
     {
         "editor.formatOnSave": true, // prettier will automatically format your files on each save
         "editor.defaultFormatter": "esbenp.prettier-vscode"
     }
     ```
   - Prettier will now automatically format your files as you save them

## Debugging

Your debugging experience will vary depending on the device that you're using (iOS, Android, web), please refer to debugging recommendations on the [Expo documentation](https://docs.expo.dev/workflow/debugging/) site.
