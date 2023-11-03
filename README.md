# Taskspire - Kanban Pomodoro AI
## A SPA PWA built with Vue 3 with TypeScript, Pinia, Vite, Tailwind and Electron
### [Website](https://taskspire.xyz)
![preview img](https://github.com/david-gi/taskspire/blob/main/docs/Screenshot.png)
OpenAI Artificial Intelligence web app to help people achieve their goals. It builds AI-generated 'Action Plans' that are managed within a one-of-a-kind Kanban + Pomodoro Task System. On each Task there are targeted AI-recommended online courses, linked through the Affiliate Marketing (Publisher) Program to generate commissions.

## Docs
This app is a single-page-app (SPA) and progressive-web-app (PWA). It uses a single REST API call _(www.taskspire.xyz/api/build-plan)_ to a simple NodeJs backend _(repo: taskspire-backend)_ used for communicating with OpenAI. There are no databases used. Data persistance is handled on the frontend via Local Storage and user-initiated file backup-and-restore.

### Models Overview
**IPlan**: Short for 'Action Plan', it is the model returned from the API call used to seed a newly created Board.
**IBoard/Board**: Short for 'Kanban Board' it is the primary model used to setup the kanban board system (TheBoard.vue).
|-**IStage**/**Stage**: stage with a list of Items
|-**IItem**/**Item**: The model coresponding to an Action Plan task.
 |-**Colors**: An Enum of color strings used to indicate an Item's difficulty, tied to the tailwindcss colors.

### Component Overview
![preview img](https://github.com/david-gi/taskspire/blob/main/docs/TheHomepage.png)
![preview img](https://github.com/david-gi/taskspire/blob/main/docs/TheBoard.png)
There are two primary screens, **TheHomepage** and **TheBoard**, auto-navigated based on whether a Board is selected.
Biggest thing to note is that **TheBoard.vue** uses Pinia's _$patch function_ to auto-update Board state, which then auto-saves to Local Storage.
The component folders are logcally organized based on component dependancies. 
To best understand the components and how they fit together, run the component overview (viewed on localhost:4444): _'npm run overview'_

### Re-Branding & Internationalization
All display text, including branding, is set via _assests/i18n/en.ts_, which makes translating easy (as well as adding multilingual support).
Simply replace the images in _/asset/images_ and _/public_ to change branding logo and favicon.
To change theming, modify _tailwind.config.js_ and _assets/styles/app.css_.

The API will return in languages other than English based on the language used by the user and by the setting of the property 'language' _(store/home.ts)_ to an ISO language code (ex: en, es, fr, jp...).

### Distribution
The PWA is browser installable via the _manifest.json file_ (dependant of SSL). This also makes it submitable to Google Play and Microsoft App Store.
If this isn't sufficient, it also comes with the boilplate for Electron-based desktop and mobile app distribution using Electron-Builder.

### Keys
Google Analytics Measurement ID is managed in config.ts. OpenAI and the Affliate Referral Program keys are managed in the backend via a _.env_ file.

### Google Analytics Events
GTag events are sent on:
- A new Action Plan is created
- A new Action Plan is rejected
- An Action Plan is deleted
- A Pomodoro timer is completed for an Item/task
- An Action Plan goal is completed

### Switching monitization
By default, an Affiliate Referral Program is used (Skillshare via Impact.com). A Freemium member's model could be implemented instead or in addtion to it.

### Switching AIs
By default, OpenAI is used, however with minimal developer effort an equivalant HuggingSpace model could be used. 
_**Note:** At the time of development, OpenAI's GPT3.5 Turbo and GPT4 provided the best results however HuggingSpace models are generally less expensive._

**Install**
```
npm i
```

**Commands**

Start Vue app:
```
npm run start
```

Build Vue app:
```
npm run build
```

Start electron app:
```
npm run start-electron
```

Build electron app distros (Boilerplate, requires further config):
```
npm run start-electron
```

Lint code:
```
npm run lint
```

Run tests:
```
npm run test

```