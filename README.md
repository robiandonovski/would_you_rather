# Would You Rather Project

The github repo can be found on this [link](https://github.com/robiandonovski/would_you_rather).
The deployed version can be found on this [link](http://would-you-rather.robertandonovski.com).

This project is startedt from scratch by using [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the project.
The Udacity provided _DATA.js which is improvisation of backend server.

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

To build and deploy:

* Build the project solution with `npm run build`
* Copy the files from 'build' folder to the server destination, in my case [link](http://would-you-rather.robertandonovski.com).

## Project file Structure
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── package.json # npm package manager file.
├── build # contains the deployment files
├── public
│   ├── favicon.ico # React Icon
│   └── index.html # React index.html
│   └── manifest.json # React manifest (auto generated by Creae React App)
└── src
    ├── index.css # Styles for your app.
    ├── index.js # This is the root of the app. Contains redux state and providers for the components.
    ├── actions
    │   ├── authedUser.js # AuthedUser actions: SET_AUTHED_USER
    │   ├── questions.js # Question actions: RECEIVE_QUESTIONS, ADD_QUESTION and ANSWER_QUESTION
    │   ├── users.js # Users actions: RECEIVE_USERS
    │   └── shared.js #
    ├── reducers
    │   ├── authedUser.js # AuthedUser reducer
    │   ├── questions.js # Question reducer
    │   ├── users.js # Users reducer
    │   └── index.js # Defines combineReducers from all reducers (AuthedUser, Questions and Users)
    ├── middleware
    │   ├── logger.js # Logger for every action to browser's console
    │   ├── index.js # Defines applyMiddleware for all middlewares (Thunk and Logger)
    ├── components
    │   ├── App.js # router handeling, loading bar,
    │   ├── Nav.js # Application navigation bar
    │   ├── CurrentAuthedUser.js # Displays the right side of the navigation when the user is authenticated. Displays name, avatar and logout button
    │   ├── Login.js # page where user can choose from list of users and login
    │   ├── Home.js # page which shows unanswered and answered questions
    │   ├── Question.js # question information displayed in lists of Home component
    │   ├── LeaderBoard.js # page which shows leader board with user's score
    │   ├── NewQuestion.js # new question form
    │   ├── QuestionDetails.js # used to detect and display details page
    │   ├── QuestionAnswer.js # displays on question details page when the question is not answered
    │   ├── QuestionStats.js # displays the statistics for answered question
    │   ├── QuestionNotFound.js # displays 404 not found question when the id is not in store questions
    ├── utils
    │   ├── _DATA.js # data provided by Udacity. Works like a backend storage
    │   ├── api.js # used to call methods, instead of calling rest API services, it is writing in _DATA.js
    ├── index.css # Global styles.
    └── index.js # Used for DOM rendering with browser router.
```

## Backend Server

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.